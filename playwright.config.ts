import { defineConfig } from "@playwright/test";

const target =
  process.env.TEST_TARGET === "server" ||
  process.argv.includes("--project=server")
    ? "server"
    : "static";
// Workers reload this config without the CLI arguments; preserve the selection.
process.env.TEST_TARGET = target;
const port = target === "server" ? 4173 : 4174;
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    viewport: { width: 375, height: 844 },
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: target,
      testMatch:
        target === "server"
          ? ["**/site.spec.ts", "**/server.spec.ts"]
          : "**/site.spec.ts",
    },
  ],
  webServer: {
    command:
      target === "server"
        ? "node .output/server/index.mjs"
        : "node scripts/serve-static.mjs",
    env: { PORT: String(port), HOST: "127.0.0.1" },
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
  },
});
