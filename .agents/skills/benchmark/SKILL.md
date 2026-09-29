---
name: benchmark
description: Build and profile this Nuxt site’s compiled bundle and browser rendering. Use when asked for a performance benchmark, bundle audit, render profile, or before/after performance comparison. Invoke with /skill:benchmark.
compatibility: Requires pnpm, Node.js, and Chromium. Run from this repository root.
---

# Production performance benchmark

Profile the **compiled production app**, never the dev server. The default command is:

```text
/skill:benchmark
```

Optional arguments name routes to prioritize, for example:

```text
/skill:benchmark / /blog /experiments /talks
```

## Test contract

Use this lab profile unless the user specifies otherwise:

- fresh `pnpm build` from the current commit;
- production server: `PORT=<unused-port> node .output/server/index.mjs`;
- Chromium, cold cache, 375×844 mobile viewport;
- 4× CPU throttle and simulated 4G: 150ms latency, 200 KiB/s down, 100 KiB/s up;
- wait at least 5 seconds after navigation;
- test `/`, `/blog`, `/experiments`, `/talks`, and one representative article unless arguments replace the route list;
- do not commit screenshots, profiles, `.output`, or temporary benchmark files.

Use a temporary directory (`mktemp -d`) for CDP scripts and reports. Stop every server and Chromium process started by the benchmark, including on failure.

## Required measurements

For each route report:

- FCP and LCP, when the browser exposes them;
- TTFB (label it **local** when profiling localhost);
- CLS and long-task count (>50ms);
- style/layout/script/main-thread durations from CDP Performance metrics;
- resource request count, transfer bytes, decoded bytes, and the three largest resources.

Also report all compiled `_nuxt` JavaScript and CSS assets as raw, gzip, and Brotli totals, plus the largest ten assets per type. Use Node `zlib` to calculate compressed sizes; do not infer them from raw byte counts.

If LCP or another browser API is unavailable, state that explicitly. Do not substitute FCP for LCP or claim Core Web Vitals from localhost lab data.

## Baseline: 2026-09-29

Baseline commit: `e08013dd`.

| Route | FCP | JS/CSS transfer | Main-thread task duration |
| --- | ---: | ---: | ---: |
| `/` | 1.53s | 63.5 KB | 251ms |
| `/blog` | 1.52s | 63.5 KB | 244ms |
| `/experiments` | 1.55s | 51.0 KB | 189ms |
| `/talks` | 1.60s | 52.1 KB | 177ms |
| representative article | 1.56s | 52.5 KB | 199ms |

Compiled asset totals: 297.7 KB JS raw / 116.3 KB gzip / 104.4 KB Brotli; 51.3 KB CSS raw / 9.8 KB gzip / 8.4 KB Brotli.

This is a local lab baseline, not RUM. TTFB and Core Web Vitals must be validated with deployed field data.

## Analysis and reporting rules

1. Report the commit, test conditions, routes, and whether the run was cold-cache.
2. Compare each result against the baseline only when the same profile is used. Show before, after, and delta.
3. Separate findings into network/server, bundle/JavaScript, main-thread/rendering, and media/font causes.
4. Include the largest assets and explain material regressions; do not give a Lighthouse-style score.
5. Treat a single run as directional. For a release decision, run at least three times and report median values.
6. Never claim an improvement solely because one metric moved in one run.
7. Before changing code, identify the dominant cost and propose a budget or measurable expected delta.

## Suggested budgets

Use these as review triggers, not universal pass/fail limits:

- no route’s initial CSS+JS transfer should regress by more than 10% or 10 KB without an explanation;
- no new long tasks (>50ms) under the lab profile;
- FCP should not regress by more than 10% from the same-profile median;
- all compiled JS should remain near or below the 116 KB gzip baseline unless functionality justifies growth.

For user-facing targets, use deployed field p75: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.
