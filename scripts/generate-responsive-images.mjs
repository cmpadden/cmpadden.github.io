import { mkdir, rm } from "node:fs/promises";
import { resolve, basename, extname } from "node:path";
import sharp from "sharp";
import { experimentLinks } from "../data/experiments.mjs";

const output = resolve("public/images/generated");
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const images = [
  ...new Set(experimentLinks.map(({ img }) => img).filter(Boolean)),
];
for (const src of images) {
  const name = basename(src, extname(src));
  for (const width of [320, 640, 960]) {
    let size = Infinity;
    for (const quality of [68, 58, 48, 38, 28, 20]) {
      const info = await sharp(resolve("public", src.slice(1)))
        .rotate()
        .resize(width, width, { fit: "cover" })
        .webp({ quality, effort: 5 })
        .toFile(resolve(output, `${name}-${width}.webp`));
      size = info.size;
      if (size <= 100_000) break;
    }
    if (size > 100_000)
      throw new Error(`Thumbnail budget exceeded: ${name}-${width}`);
  }
}
// The UI already renders the texture in grayscale. Quantizing to 16 gray levels
// preserves the noise treatment while avoiding a 49 kB RGB texture per visit.
await sharp("public/images/noise.png")
  .grayscale()
  .png({ palette: true, colours: 16, effort: 10 })
  .toFile(resolve(output, "noise.png"));
console.log(
  `Generated ${images.length * 3} responsive thumbnails and noise texture`,
);
