#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { experimentLinks } from "../data/experiments.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const usage = `Usage: pnpm generate:experiment-thumbnail -- --experiment <title> [options]

Options:
  --direction <text>  Additional art direction for this generation.
  --output <path>     Override the experiment metadata's image path.
  --dry-run           Print the resolved prompt and output path without calling OpenAI.
  --help              Show this help message.

Available experiments:
${experimentLinks.map(({ title }) => `  - ${title}`).join("\n")}`;

function parseArgs(args) {
  const options = { direction: "", dryRun: false };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--") {
      continue;
    }
    if (arg === "--help") {
      options.help = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (["--experiment", "--direction", "--output"].includes(arg)) {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`Missing value for ${arg}.\n\n${usage}`);
      }
      options[arg.slice(2)] = value;
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}\n\n${usage}`);
    }
  }

  return options;
}

function buildPrompt(experiment, direction) {
  const context = [
    `Experiment title: ${experiment.title}`,
    `Experiment description: ${experiment.description}`,
    experiment.thumbnailPrompt &&
      `Art direction: ${experiment.thumbnailPrompt}`,
    direction && `Additional direction: ${direction}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `Create a distinctive 1:1 square website thumbnail for a creative web experiment. Use the experiment metadata below as the source of truth. Make an original, bold graphic composition that communicates its subject and remains legible at small sizes. Fill the canvas edge to edge. Do not include words, letters, logos, UI, watermarks, borders, or a literal screenshot. Avoid photorealistic stock-photo styling.\n\n${context}`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage);
    return;
  }
  if (!options.experiment) {
    throw new Error(`--experiment is required.\n\n${usage}`);
  }

  const experimentName = options.experiment.trim().toLocaleLowerCase();
  const experiment = experimentLinks.find(
    ({ title }) => title.toLocaleLowerCase() === experimentName,
  );
  if (!experiment) {
    throw new Error(`Unknown experiment: ${options.experiment}\n\n${usage}`);
  }
  if (!experiment.img?.startsWith("/")) {
    throw new Error(
      `Experiment ${experiment.title} does not define a site image path.`,
    );
  }

  const output = resolve(
    projectRoot,
    options.output ?? `public${experiment.img}`,
  );
  const prompt = buildPrompt(experiment, options.direction);

  if (options.dryRun) {
    console.log(`Output: ${output}\n\nPrompt:\n${prompt}`);
    return;
  }
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is required. Use --dry-run to inspect the prompt without generating an image.",
    );
  }

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
    throw new Error(
      `OpenAI Images API request failed (${response.status}): ${await response.text()}`,
    );
  }

  const data = await response.json();
  const image = data.data?.[0]?.b64_json;
  if (!image) {
    throw new Error("OpenAI Images API response did not include image data.");
  }

  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, Buffer.from(image, "base64"));
  console.log(`Wrote ${output}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
