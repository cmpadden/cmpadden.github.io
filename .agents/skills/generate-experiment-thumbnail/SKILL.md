---
name: generate-experiment-thumbnail
description: Generates a WebP thumbnail for an experiment using its title, description, image path, and optional art direction from the experiment metadata. Use when an experiment needs a new or refreshed cover image.
compatibility: Requires Node.js 18+ and OPENAI_API_KEY to generate images.
---

# Generate an experiment thumbnail

Experiment metadata in `data/experiments.mjs` is the source of truth for the title, description, destination image path, and optional `thumbnailPrompt` art direction. Add or refine that metadata before generating.

Generate a thumbnail with an optional one-off direction:

```bash
OPENAI_API_KEY=... pnpm generate:experiment-thumbnail -- \
  --experiment "photos.colton.boo" \
  --direction "Make the exposure bands diagonal and sparse"
```

Inspect the resolved prompt and output path without making an API request:

```bash
pnpm generate:experiment-thumbnail -- --experiment "Conway" --dry-run
```

Use `--output path` only when intentionally writing somewhere other than the image path in the experiment metadata. The script uses `gpt-image-1` by default; set `OPENAI_IMAGE_MODEL` to override it.
