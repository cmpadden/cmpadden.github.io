import { mkdir, readFile, rename, rm } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import sharp from "sharp";
import opentype from "opentype.js";
import { SOCIAL_IMAGE_SECTIONS, socialImagePath } from "../shared/site";

const source = resolve("public/images/og-index.webp");
const font = opentype.parse(
  new Uint8Array(await readFile("assets/fonts/DejaVuSansMono-Bold.ttf")).buffer,
);

// Preserve the existing image's frame and texture exactly. Cover its wordmark
// with a clean strip of the same texture sampled from above the lettering.
const cleanTexture = await sharp(source)
  .extract({ left: 12, top: 80, width: 1176, height: 150 })
  .toBuffer();
const background = await sharp(source)
  .composite([{ input: cleanTexture, left: 12, top: 240 }])
  .png()
  .toBuffer();

for (const section of SOCIAL_IMAGE_SECTIONS) {
  const label = `colton.foo | ${section}`;
  // Match the original bold monospace wordmark; shrink longer labels to keep
  // generous side margins without wrapping onto a second line.
  const original = font.getPath(label, 0, 0, 96).getBoundingBox();
  const fontSize = 96 * Math.min(1, 1056 / (original.x2 - original.x1));
  const lettering = font.getPath(label, 0, 0, fontSize);
  lettering.fill = "#ff6900";
  const bounds = lettering.getBoundingBox();
  const x = (1200 - (bounds.x2 - bounds.x1)) / 2 - bounds.x1;
  const y = (630 - (bounds.y2 - bounds.y1)) / 2 - bounds.y1;
  // SVG paths make rendering independent of fonts installed on the build host.
  const text = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><g transform="translate(${x} ${y})">${lettering.toSVG(2)}</g></svg>`,
  );

  const destination = resolve(
    "public",
    socialImagePath(`/${section}/`).slice(1),
  );
  const directory = resolve(destination, "..");
  await mkdir(directory, { recursive: true });
  const temporary = resolve(directory, `.${randomUUID()}.webp`);
  try {
    await sharp(background)
      .composite([
        {
          input: text,
          left: 0,
          top: 0,
        },
      ])
      .webp({ quality: 90 })
      .toFile(temporary);
    await rename(temporary, destination);
  } finally {
    await rm(temporary, { force: true });
  }
}
console.log(`Generated ${SOCIAL_IMAGE_SECTIONS.length} section social images`);
