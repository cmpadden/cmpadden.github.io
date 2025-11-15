import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

export default defineEventHandler(async () => {
  const filePath = join(process.cwd(), 'public', '1000_french_conjugations.json');
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw);
});
