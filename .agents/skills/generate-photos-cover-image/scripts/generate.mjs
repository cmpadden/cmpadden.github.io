import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const basePrompt = `Create a 1:1 square cover image for photos.colton.boo, an experiment in black and white film photography. Make it an abstract graphic composition inspired by light passing through a negative and an image emerging in a darkroom. Use one large, softly edged off-white shape interrupted by a smaller near-black shape, with irregular exposure bands and areas that dissolve into coarse monochrome dithering. Limit the palette to paper white, silver gray, and deep black. Make the grain and dither visibly structural, like an experimental photocopy or risograph print. Bold enough to read as a small website thumbnail, with generous empty space and an imperfect handmade feel. No recognizable landscape, horizon, objects, people, camera equipment, text, borders, or photorealism. Fill the square edge to edge.`;

const usage = `Usage: OPENAI_API_KEY=... node scripts/generate.mjs "additional description" [--output path]`;
const args = process.argv.slice(2);
const outputFlag = args.indexOf("--output");
const description = (
  outputFlag === -1
    ? args
    : args.filter((_, index) => index !== outputFlag && index !== outputFlag + 1)
).join(" ");

if (!description) {
  throw new Error(usage);
}
if (outputFlag !== -1 && !args[outputFlag + 1]) {
  throw new Error("Missing output path.\n" + usage);
}
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required.");
}

const skillDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutput = resolve(
  skillDir,
  "../../../public/images/previews/photos.colton.boo.webp",
);
const output = resolve(process.cwd(), args[outputFlag + 1] ?? defaultOutput);
const prompt = `${basePrompt}\n\nAdditional direction: ${description}`;

const response = await fetch("https://api.openai.com/v1/images/generations", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1",
    prompt,
    size: "1024x1024",
    quality: "medium",
    output_format: "webp",
    output_compression: 85,
  }),
});

if (!response.ok) {
  throw new Error(`OpenAI Images API request failed (${response.status}): ${await response.text()}`);
}

const data = await response.json();
const image = data.data?.[0]?.b64_json;
if (!image) {
  throw new Error("OpenAI Images API response did not include image data.");
}

await mkdir(dirname(output), { recursive: true });
await writeFile(output, Buffer.from(image, "base64"));
console.log(`Wrote ${output}`);
