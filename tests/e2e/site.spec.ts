import { test, expect, type Page } from "@playwright/test";

async function navigate(page: Page, path: string) {
  await page.evaluate(async (to) => {
    const element = document.querySelector("#__nuxt") as Element & {
      __vue_app__: {
        config: {
          globalProperties: { $router: { push(to: string): Promise<void> } };
        };
      };
    };
    await element.__vue_app__.config.globalProperties.$router.push(to);
  }, path);
}

test("normal navigation resets document scroll; back and anchors restore it", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(500);
  await page.getByLabel("Toggle navigation").click();
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Blog", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Blog");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.goBack();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(500);
  await navigate(page, "/#experiments");
  await expect
    .poll(() =>
      page
        .locator("#experiments")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBeLessThan(100);
  await navigate(page, "/talks/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Talks");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("missing article SPA navigation shows a minimal 404 page", async ({
  page,
}) => {
  await page.goto("/blog/");
  await navigate(page, "/blog/does-not-exist/");
  await expect(
    page.getByRole("heading", { name: "404", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Return home" })).toHaveCount(
    0,
  );
});

test("SSR images work without JavaScript and use responsive variants", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 844 },
  });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/experiments/`);
    const image = page.locator("main img").first();
    await expect(image).toBeVisible();
    await expect(image).toHaveCSS("opacity", "1");
    expect(
      await image.evaluate((el: HTMLImageElement) => el.currentSrc),
    ).toContain("-320.webp");
    expect(await image.getAttribute("srcset")).toContain("960w");
  } finally {
    await context.close();
  }
});

test("static-compatible legacy redirects preserve their destination", async ({
  page,
}) => {
  await page.goto("/articles/");
  await expect(page).toHaveURL(/\/blog\/$/);
  await page.goto("/atom/");
  await expect(page).toHaveURL(/\/atom.xml$/);
});

test("no article payloads are prefetched just from visibility", async ({
  page,
}) => {
  const payloads: string[] = [];
  page.on("request", (request) => {
    if (/\/blog\/[^/]+\/_payload.json/.test(request.url()))
      payloads.push(request.url());
  });
  await page.goto("/");
  await page.waitForTimeout(800);
  expect(payloads).toEqual([]);
});

test("audio has one loop, stops all resources, and handles a late media response", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const state = {
      requests: 0,
      reads: 0,
      stopped: 0,
      closed: 0,
      disconnected: 0,
      deferred: false,
      resolve: () => {},
    };
    Object.assign(window, { __audio: state });
    const stream = () => ({
      getTracks: () => [{ stop: () => state.stopped++ }],
    });
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getUserMedia: async () => {
          state.requests++;
          if (state.deferred)
            return new Promise((resolve) => {
              state.resolve = () => resolve(stream());
            });
          return stream();
        },
      },
    });
    class FakeAudioContext {
      state = "running";
      resume = async () => {};
      close = async () => {
        this.state = "closed";
        state.closed++;
      };
      createAnalyser = () => ({
        fftSize: 2048,
        frequencyBinCount: 1024,
        getByteTimeDomainData: (data: Uint8Array) => {
          state.reads++;
          data.fill(128);
        },
        getByteFrequencyData: (data: Uint8Array) => data.fill(32),
        disconnect: () => state.disconnected++,
      });
      createMediaStreamSource = () => ({
        connect: () => {},
        disconnect: () => state.disconnected++,
      });
    }
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: FakeAudioContext,
    });
  });
  const state = () =>
    page.evaluate(
      () =>
        (
          window as unknown as {
            __audio: {
              requests: number;
              reads: number;
              stopped: number;
              closed: number;
              disconnected: number;
            };
          }
        ).__audio,
    );
  await page.goto("/experiments/audio/");
  await page.getByRole("button", { name: "Enable", exact: true }).click();
  await expect.poll(async () => (await state()).reads).toBeGreaterThan(1);
  await expect(
    page.getByRole("button", { name: "Enable", exact: true }),
  ).toBeDisabled();
  expect((await state()).requests).toBe(1);
  await page.getByRole("button", { name: "Disable", exact: true }).click();
  const stopped = await state();
  expect(stopped.stopped).toBe(1);
  expect(stopped.closed).toBe(1);
  expect(stopped.disconnected).toBe(2);
  await page.waitForTimeout(200);
  expect((await state()).reads).toBe(stopped.reads);
  await page.getByRole("button", { name: "Enable", exact: true }).click();
  await expect
    .poll(async () => (await state()).reads)
    .toBeGreaterThan(stopped.reads);
  await navigate(page, "/talks/");
  const unmounted = await state();
  expect(unmounted.stopped).toBe(2);
  expect(unmounted.closed).toBe(2);
  await page.waitForTimeout(200);
  expect((await state()).reads).toBe(unmounted.reads);
  await navigate(page, "/experiments/audio/");
  await page.evaluate(() => {
    (window as unknown as { __audio: { deferred: boolean } }).__audio.deferred =
      true;
  });
  await page.getByRole("button", { name: "Enable", exact: true }).click();
  await expect(page.getByRole("button", { name: "Enabling…" })).toBeVisible();
  await navigate(page, "/talks/");
  await page.evaluate(() => {
    (window as unknown as { __audio: { resolve(): void } }).__audio.resolve();
  });
  await expect.poll(async () => (await state()).stopped).toBe(3);
  expect((await state()).closed).toBe(2);
});

test("MIDI listener ownership survives reconnects and hot-plugging", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const state = {
      listeners: 0,
      closes: 0,
      stateListeners: 0,
      deferred: false,
      resolve: () => {},
    };
    class Input extends EventTarget {
      id = "test-input";
      name = "Test keyboard";
      manufacturer = "Test";
      state = "connected";
      override addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject | null,
        options?: boolean | AddEventListenerOptions,
      ) {
        if (type === "midimessage") state.listeners++;
        super.addEventListener(type, listener, options);
      }
      override removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject | null,
        options?: boolean | EventListenerOptions,
      ) {
        if (type === "midimessage") state.listeners--;
        super.removeEventListener(type, listener, options);
      }
      close = async () => {
        state.closes++;
      };
    }
    const input = new Input();
    class Access extends EventTarget {
      inputs = new Map([[input.id, input]]);
      outputs = new Map();
      override addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject | null,
        options?: boolean | AddEventListenerOptions,
      ) {
        if (type === "statechange") state.stateListeners++;
        super.addEventListener(type, listener, options);
      }
      override removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject | null,
        options?: boolean | EventListenerOptions,
      ) {
        if (type === "statechange") state.stateListeners--;
        super.removeEventListener(type, listener, options);
      }
    }
    const access = new Access();
    const emit = (data: number[]) => {
      const event = new Event("midimessage");
      Object.defineProperty(event, "data", { value: new Uint8Array(data) });
      input.dispatchEvent(event);
    };
    Object.assign(window, { __midi: { state, input, access, emit } });
    Object.defineProperty(navigator, "requestMIDIAccess", {
      configurable: true,
      value: async () => {
        if (state.deferred)
          return new Promise((resolve) => {
            state.resolve = () => resolve(access);
          });
        return access;
      },
    });
  });
  const state = () =>
    page.evaluate(
      () =>
        (
          window as unknown as {
            __midi: {
              state: {
                listeners: number;
                closes: number;
                stateListeners: number;
              };
            };
          }
        ).__midi.state,
    );
  await page.goto("/experiments/midi/");
  await page.getByRole("button", { name: "Enable MIDI" }).click();
  await expect.poll(async () => (await state()).listeners).toBe(1);
  await page.evaluate(() => {
    (
      window as unknown as { __midi: { emit(data: number[]): void } }
    ).__midi.emit([0x92, 60, 64]);
  });
  await expect(
    page.getByRole("cell", { name: "Note On", exact: true }),
  ).toBeVisible();
  await navigate(page, "/experiments/chords/");
  expect((await state()).listeners).toBe(0);
  expect((await state()).stateListeners).toBe(0);
  await page.getByRole("button", { name: "Enable MIDI" }).click();
  await expect.poll(async () => (await state()).listeners).toBe(1);
  await page.evaluate(() => {
    const midi = (
      window as unknown as {
        __midi: {
          emit(data: number[]): void;
          input: { state: string };
          access: EventTarget;
        };
      }
    ).__midi;
    midi.emit([0x91, 60, 100]);
    midi.emit([0x91, 64, 100]);
    midi.emit([0x91, 67, 100]);
  });
  await expect(page.getByText("Active notes: 60, 64, 67")).toBeVisible();
  await page.evaluate(() => {
    (
      window as unknown as { __midi: { emit(data: number[]): void } }
    ).__midi.emit([0x91, 64, 0]);
  });
  await expect(page.getByText("Active notes: 60, 67")).toBeVisible();
  await page.evaluate(() => {
    const midi = (
      window as unknown as {
        __midi: { input: { state: string }; access: EventTarget };
      }
    ).__midi;
    midi.input.state = "disconnected";
    midi.access.dispatchEvent(new Event("statechange"));
  });
  expect((await state()).listeners).toBe(0);
  await expect(page.getByText("Active notes: None")).toBeVisible();
  await page.evaluate(() => {
    const midi = (
      window as unknown as {
        __midi: { input: { state: string }; access: EventTarget };
      }
    ).__midi;
    midi.input.state = "connected";
    midi.access.dispatchEvent(new Event("statechange"));
  });
  expect((await state()).listeners).toBe(1);
  await navigate(page, "/talks/");
  expect((await state()).listeners).toBe(0);
  expect((await state()).stateListeners).toBe(0);
  await page.evaluate(() => {
    (
      window as unknown as { __midi: { state: { deferred: boolean } } }
    ).__midi.state.deferred = true;
  });
  await navigate(page, "/experiments/midi/");
  await page.getByRole("button", { name: "Enable MIDI" }).click();
  await expect(page.getByRole("button", { name: "Connecting…" })).toBeVisible();
  await navigate(page, "/talks/");
  await page.evaluate(() => {
    (
      window as unknown as { __midi: { state: { resolve(): void } } }
    ).__midi.state.resolve();
  });
  await page.waitForTimeout(50);
  expect((await state()).listeners).toBe(0);
  expect((await state()).stateListeners).toBe(0);
});

test("direct unknown pages return 404, and primary routes hydrate cleanly", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (/hydration.*mismatch/i.test(message.text()))
      errors.push(message.text());
  });
  const missing = await page.goto("/blog/does-not-exist/");
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "404", exact: true }),
  ).toBeVisible();
  for (const route of [
    "/",
    "/blog/",
    "/experiments/",
    "/talks/",
    "/blog/nuxt-v3-migration/",
  ]) {
    await page.goto(route);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://colton.foo${route}`,
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
  }
  expect(errors).toEqual([]);
});

test("matrix keyboard controls are scoped to the page", async ({ page }) => {
  await page.addInitScript(() => {
    const state = { listeners: 0 };
    Object.assign(window, { __keys: state });
    const add = window.addEventListener.bind(window);
    const remove = window.removeEventListener.bind(window);
    window.addEventListener = ((
      type: string,
      callback: EventListener,
      options?: boolean | AddEventListenerOptions,
    ) => {
      if (type === "keydown") state.listeners++;
      add(type, callback, options);
    }) as typeof window.addEventListener;
    window.removeEventListener = ((
      type: string,
      callback: EventListener,
      options?: boolean | EventListenerOptions,
    ) => {
      if (type === "keydown") state.listeners--;
      remove(type, callback, options);
    }) as typeof window.removeEventListener;
  });
  await page.goto("/talks/");
  const count = () =>
    page.evaluate(
      () =>
        (window as unknown as { __keys: { listeners: number } }).__keys
          .listeners,
    );
  const baseline = await count();
  for (let i = 0; i < 2; i++) {
    await navigate(page, "/experiments/matrix/");
    await expect.poll(count).toBe(baseline + 1);
    await page.keyboard.press("Space");
    await expect(
      page.getByRole("button", { name: "Next multiplication step" }),
    ).toBeEnabled();
    await navigate(page, "/talks/");
    await expect.poll(count).toBe(baseline);
  }
});
