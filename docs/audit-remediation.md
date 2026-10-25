# Nuxt audit remediation

Implemented against `62dcd560` (2026-10-25). These are working-tree changes, not a production deployment. Previously published drafts remain publicly accessible until the new output is deployed; this does not erase earlier Git or deployment history.

## Changes and regression coverage

| Audit feedback                           | Implementation                                                                                                                                                                                                                                                                                                                                 | Coverage                                                                                                                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Draft publication                        | One validated publication manifest excludes drafts **before** body parsing/serialization in production. Local preview requires `NUXT_PREVIEW_DRAFTS=1` and Nuxt dev mode.                                                                                                                                                                      | Unit publication tests, production API/HTML 404 tests, output scan for draft routes/serialized references.                                                                                |
| Incorrect canonical origin               | `shared/site.ts` defines `https://colton.foo`, public page routes, and trailing-slash URL conventions. SEO, JSON-LD, sitemap, robots, and feed consume it.                                                                                                                                                                                     | Canonical/asset URL unit tests; generated and browser metadata checks.                                                                                                                    |
| Blank missing articles                   | Article fetch failures propagate to a real Nuxt error page; the error template no longer nests a body element. The minimal 404 shows “404” and “Page not found” without a card, shadow, or return link.                                                                                                                                        | Nitro status tests and minimal SPA 404 checks on both hosting modes.                                                                                                                      |
| Scroll retention                         | The decorative frame is fixed, but the **document** scrolls. Nuxt owns forward resets, history restoration, and anchors; CSS reserves sticky-header anchor space. Light layout has one main landmark.                                                                                                                                          | Forward/back/anchor/default-to-light navigation tests.                                                                                                                                    |
| Oversized images                         | Sharp generates 320/640/960 square WebP derivatives at build/dev time. Variant quality adapts to a 100 kB ceiling. A quantized grayscale noise texture replaces the 49 kB RGB request.                                                                                                                                                         | Build-time size enforcement, generated-output checks, mobile source selection test, production browser measurements.                                                                      |
| JS-dependent image visibility            | Images are visible in SSR HTML, with no JS-gated fade. Dimensions and layout space are reserved. Only the first cover is eager/high priority.                                                                                                                                                                                                  | Browser with JavaScript disabled; generated HTML checks.                                                                                                                                  |
| Audio lifecycle and rendering            | A scoped composable owns permission races, a single cancellable loop, tracks, nodes, and context. Drawing is capped at 30 fps with shallow typed samples, summaries at 10 Hz, and bounded ten-row tables. Spectrogram scrolling reuses the bitmap instead of redrawing historical circles. Canvases resize and clean up observers.             | Mocked-device browser test checks duplicate starts, stable reads after disable/unmount, closed/disconnected resources, and late media response cleanup. Physical devices were not tested. |
| MIDI/matrix listeners                    | Shared MIDI composable attaches/removes owned listeners, handles hot-plugging, and ignores late permission results. Permission requests are explicit user actions. Chords use reactive state, handle all channels/zero-velocity Note Off, and separate devices. Matrix keyboard listener is scoped and does not hijack form/link/button input. | Mocked MIDI message/hot-plug/reconnect/unmount/pending-permission tests; repeated matrix route/keyboard cleanup test.                                                                     |
| Static legacy redirects                  | Explicit server HTTP redirects and generated HTML counterparts for the legacy index, published article slugs, and old feed URL. Static output writes occur in Nitro's prerender lifecycle using its configured output directory, not a dist alias/close hook.                                                                                  | Unit output-directory test, Nitro redirect tests, generated artifact and static-browser navigation checks.                                                                                |
| Atom MIME                                | Real `atom.xml` artifact, correct Nitro Content-Type, updated alternate/feed links, old URL compatibility redirect.                                                                                                                                                                                                                            | Server header tests, XML output assertions, static navigation test. Deployed GitHub Pages XML headers should be smoke-tested after release.                                               |
| Types and publication structure          | Public article types live under `shared/types/`; runtime module paths are no longer imported by UI components. Page-route and publication lists are reused. Existing root app structure is intentionally retained to avoid a nonfunctional migration.                                                                                          | Typecheck, manifest and generated route coverage.                                                                                                                                         |
| Oversized list payloads/excerpt contract | Card summaries contain only card fields; home limits results server-side. SEO reads the module's actual top-level excerpt.                                                                                                                                                                                                                     | API shape/limit tests and excerpt unit tests.                                                                                                                                             |
| Speculative prefetch                     | Article and experiment links explicitly set visibility prefetch **off**, interaction prefetch on.                                                                                                                                                                                                                                              | Browser test asserts no article payload requests from visibility alone.                                                                                                                   |
| CI/tooling                               | PR/main validation includes locked installs, stable TypeScript 5.9.3, typechecking, unit tests, production build/API/browser tests, generation/output tests, and static browser tests. Only validated main artifacts deploy; obsolete SQLite rebuild removed.                                                                                  | The same commands run locally; dependency lockfile is frozen-install compatible.                                                                                                          |
| Accessibility                            | Home/experiments have h1s; audio uses native disabled-state buttons; matrix icon controls are labeled; cover images have dimensions/decorative alt; error pages have clear headings; reduced-motion styles disable motion.                                                                                                                     | Browser h1 and functional control checks plus typecheck. This is not a full assistive-technology audit.                                                                                   |

## Performance budgets and interpretation

The identified dominant cost was thumbnail traffic, not compiled JavaScript. Targets were at least 50% less home/experiments image transfer in the same cold mobile profile and a maximum 100 kB per generated thumbnail variant. Do not introduce manual chunks or a database to optimize this small static site.

Measurements use a fresh production Node build, Chromium 154, cold cache, 375×844 mobile viewport, 4× CPU slowdown, 150 ms latency, 200 KiB/s download and 100 KiB/s upload, observing approximately 12 seconds per navigation. Three post-change runs are summarized by median. The pre-change audit recorded only one run, so timing deltas are directional—not controlled release-quality before/after medians. The local server does not compress responses; GitHub Pages served the checked JavaScript asset with gzip. Requests include prefetch/lazy resources in the observation window. TTFB is **local**, not deployed origin latency.

There is no field Core Web Vitals or INP claim here. Validate deployed p75 LCP <=2.5 s, INP <=200 ms, CLS <=0.1 with field data. Keep compiled JavaScript near/below the existing 116 kB gzip review budget. Review route CSS/JS increases over 10% or 10 kB and repeat at least three times before making timing-based release decisions.

## Measured results

All sizes below are decimal kB. “Before” is the single pre-change audit observation; “after” is the median of three runs. Byte reductions reflect the requested resources in this lab window; the timing columns are directional given the unmatched run counts.

| Route                     | FCP before → after | LCP before → after | Transfer before → after | Transfer delta |
| ------------------------- | ------------------ | ------------------ | ----------------------- | -------------- |
| `/`                       | 1.708 → 1.532 s    | 3.100 → 1.928 s    | 1,582.4 → 403.1 kB      | −74.5%         |
| `/blog`                   | 1.624 → 1.536 s    | 1.624 → 1.536 s    | 480.2 → 340.1 kB        | −29.2%         |
| `/experiments`            | 1.568 → 1.516 s    | 2.900 → 1.752 s    | 1,720.2 → 421.9 kB      | −75.5%         |
| `/talks`                  | 1.560 → 1.508 s    | 1.560 → 1.508 s    | 336.0 → 299.6 kB        | −10.8%         |
| `/blog/nuxt-v3-migration` | 1.600 → 1.560 s    | 1.600 → 1.560 s    | 430.6 → 397.5 kB        | −7.7%          |

Image transfer fell from **1,168.4 to 75.3 kB on home (−93.6%)**, and from **1,415.4 to 108.6 kB on experiments (−92.3%)**. This exceeds the proposed 50% reduction target. The noise file itself is now 8.4 kB rather than 49.3 kB. Home's extracted payload fell from 3.5 to 1.6 kB; the blog list payload fell from 12.6 to 4.6 kB. PDFs and unused public fonts do not count as initial-route downloads.

### Post-change navigation and rendering details

Median timings are milliseconds. Decoded bytes are response-body bytes from Resource Timing, **not image bitmap memory**. Transfer is the Network-domain encoded-byte total, including headers; request counts include browser/prefetch requests. The Resource Timing and Network-domain totals do not have identical inclusion rules.

| Route                  | Local TTFB | CLS | Long tasks per run | Requests | Transfer kB | Decoded kB |
| ---------------------- | ---------: | --: | ------------------ | -------: | ----------: | ---------: |
| `/`                    |        0.7 |   0 | 1 / 1 / 1          |       30 |       403.1 |      394.6 |
| `/blog`                |        0.6 |   0 | 1 / 1 / 1          |       27 |       340.1 |      332.2 |
| `/experiments`         |        0.6 |   0 | 0 / 0 / 0          |       34 |       421.9 |      412.5 |
| `/talks`               |        0.7 |   0 | 1 / 0 / 0          |       23 |       299.6 |      292.9 |
| representative article |        0.7 |   0 | 0 / 0 / 0          |       26 |       397.5 |      389.9 |

| Route                  | Style | Layout | Script | Total main-thread task duration |
| ---------------------- | ----: | -----: | -----: | ------------------------------: |
| `/`                    |  23.1 |   21.8 |   22.7 |                           237.0 |
| `/blog`                |  21.6 |   26.0 |   20.1 |                           226.8 |
| `/experiments`         |   6.9 |   25.7 |   19.6 |                           204.2 |
| `/talks`               |   6.4 |   23.0 |   19.3 |                           191.6 |
| representative article |   8.0 |   26.7 |   46.9 |                           218.6 |

CDP Performance durations are cumulative over each observation, not a GPU/raster trace. No browser exceptions occurred on these routes. There are still >50 ms tasks on home/blog (56–68 ms and 60–63 ms respectively), and talks had one 51 ms task in one run. Thus this is **not** a claim that the suggested no-new-long-tasks review trigger is universally satisfied. Investigate repeatable task regressions with traces rather than optimizing a single borderline observation; live experiment interaction and field INP need separate profiling.

### Three largest requested resources per route

Values are transfer kB, including Resource Timing's header allowance. Hashes identify this build only.

| Route                  | Largest                      | Second             | Third                     |
| ---------------------- | ---------------------------- | ------------------ | ------------------------- |
| `/`                    | `BK2b1byT.js` 74.1           | `KlB3SC8L.js` 63.0 | `entry.DqE2iPBZ.css` 49.7 |
| `/blog`                | `BK2b1byT.js` 74.1           | `KlB3SC8L.js` 63.0 | `entry.DqE2iPBZ.css` 49.7 |
| `/experiments`         | `BK2b1byT.js` 74.1           | `KlB3SC8L.js` 63.0 | `entry.DqE2iPBZ.css` 49.7 |
| `/talks`               | `BK2b1byT.js` 74.1           | `KlB3SC8L.js` 63.0 | `entry.DqE2iPBZ.css` 49.7 |
| representative article | `nuxt-migration-pr.png` 74.7 | `BK2b1byT.js` 74.1 | `KlB3SC8L.js` 63.0        |

### Compiled client assets

All `_nuxt` JavaScript/CSS assets, compressed individually using Node zlib `gzipSync` and `brotliCompressSync`, then summed. Images, payload JSON, and server code are excluded.

| Assets     | Count |   Raw |  Gzip | Brotli |
| ---------- | ----: | ----: | ----: | -----: |
| JS before  |    30 | 273.3 | 107.8 |   96.8 |
| JS after   |    30 | 274.9 | 109.0 |   97.7 |
| CSS before |     3 |  53.2 |  10.0 |    8.6 |
| CSS after  |     4 |  50.2 |   9.7 |    8.3 |

JS grows **1.2 kB gzip (+1.1%)**, remaining below the historical 116.3 kB gzip baseline. CSS decreases about 0.3 kB gzip. The entry chunk grows while runtime-dom is folded into the ready chunk; compare totals rather than interpreting a single hash's size as a new dependency. The largest assets are mostly Nuxt/Vue runtime and shared UI. Additional cleanup/lifecycle code is balanced by simpler experiment templates; no arbitrary manual chunk configuration was added.

Largest ten JavaScript assets (kB):

| Asset                             |  Raw | Gzip | Brotli |
| --------------------------------- | ---: | ---: | -----: |
| `BK2b1byT.js` (Vue runtime-core)  | 73.8 | 28.4 |   25.9 |
| `KlB3SC8L.js` (entry)             | 62.7 | 22.4 |   19.9 |
| `BS4hGprP.js` (ready/runtime-dom) | 26.1 | 10.6 |    9.5 |
| `CZDkmoem.js` (shared SEO)        | 14.8 |  5.8 |    5.3 |
| `lHVM0f1_.js` (shared article)    | 12.1 |  4.5 |    4.2 |
| `DMGWb1iJ.js` (article route)     | 11.2 |  4.8 |    4.3 |
| `DvcCgLFU.js` (Nuxt)              |  8.6 |  3.6 |    3.2 |
| `DgOF2jEc.js` (Header)            |  7.7 |  3.0 |    2.6 |
| `CquK9QwH.js` (NuxtLink)          |  7.3 |  2.9 |    2.6 |
| `KBDsBoUc.js` (fetch)             |  7.1 |  2.9 |    2.6 |

All four CSS assets (fewer than ten):

| Asset                   |    Raw |  Gzip | Brotli |
| ----------------------- | -----: | ----: | -----: |
| `entry.DqE2iPBZ.css`    | 49.430 | 9.194 |  7.943 |
| `ProsePre.B1S6a1qW.css` |  0.608 | 0.325 |  0.225 |
| `default.BQcYRMcT.css`  |  0.150 | 0.142 |  0.105 |
| `_...DjO8DLlz.css`      |  0.044 | 0.064 |  0.048 |

## Validation completed

- `pnpm typecheck`
- `pnpm test`: 5 passing tests
- `pnpm build`
- `pnpm test:e2e --project=server`: 12 passing tests
- `pnpm generate`
- `pnpm test:output`: 4 passing tests
- `pnpm test:e2e --project=static`: 9 passing tests
- Frozen-lockfile compatibility and `git diff --check`

Temporary benchmark servers/browsers were stopped; the original development server on port 3000 was left running. Benchmark scripts, raw profiles, and screenshots are temporary artifacts, not committed source files.
