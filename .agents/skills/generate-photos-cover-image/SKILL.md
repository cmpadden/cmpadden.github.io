---
name: generate-photos-cover-image
description: Generates the abstract photos.colton.boo film-photography cover image with the OpenAI Images API. Use when the photos experiment needs a new cover image.
compatibility: Requires Node.js 18+ and OPENAI_API_KEY.
---

# Generate photos.colton.boo cover image

Pass a short additional direction; it is appended to the fixed art-direction prompt. The generated optimized WebP defaults to the site's photos preview path:

```bash
cd .agents/skills/generate-photos-cover-image
OPENAI_API_KEY=... node scripts/generate.mjs "make the exposure bands diagonal and sparse"
```

Optionally provide a different output path:

```bash
OPENAI_API_KEY=... node scripts/generate.mjs "use a more dramatic central shape" --output ../../../public/images/previews/photos.colton.boo.webp
```

The script uses `gpt-image-1` by default. Set `OPENAI_IMAGE_MODEL` to override it.
