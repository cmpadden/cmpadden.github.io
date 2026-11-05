import { mkdir, rename, rm } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { resolve, basename, extname } from "node:path";
import sharp from "sharp";
import { experimentLinks } from "../data/experiments.mjs";

const output = resolve("public/images/generated");
await mkdir(output, { recursive: true });

// Keep assets available to a running dev server while regenerating. Write each
// replacement beside its destination, then rename it atomically into place.
async function publishImage(image, filename) {
  const temporary = resolve(output, `.${randomUUID()}-${filename}`);
  try {
    const info = await image.toFile(temporary);
    await rename(temporary, resolve(output, filename));
    return info;
  } finally {
    await rm(temporary, { force: true });
  }
}

// Publish the shared texture before processing the larger thumbnail set.
// The UI renders it in grayscale; 16 gray levels preserve the treatment.
await publishImage(
  sharp("public/images/noise.png")
    .grayscale()
    .png({ palette: true, colours: 16, effort: 10 }),
  "noise.png",
);

const images = [
  ...new Set(experimentLinks.map(({ img }) => img).filter(Boolean)),
];
for (const src of images) {
  const name = basename(src, extname(src));
  for (const width of [320, 640, 960]) {
    let size = Infinity;
    for (const quality of [68, 58, 48, 38, 28, 20]) {
      const info = await publishImage(
        sharp(resolve("public", src.slice(1)))
          .rotate()
          .resize(width, width, { fit: "cover" })
          .webp({ quality, effort: 5 }),
        `${name}-${width}.webp`,
      );
      size = info.size;
      if (size <= 100_000) break;
    }
    if (size > 100_000)
      throw new Error(`Thumbnail budget exceeded: ${name}-${width}`);
  }
}
console.log(
  `Generated ${images.length * 3} responsive thumbnails and noise texture`,
);
