// The Dog Ate My Homework: Funniest Excuse
// Writes one line — a dog's excuse after being caught eating the homework —
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "It said \u2018show your work,\u2019 so I ate the evidence \u2014 nothing to show, nothing to grade, and I still expect full marks.";

// Validate: 1-200 characters, UTF-8, no newline, not only whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`LINE must be 1-200 characters, got ${LINE.length}`);
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("LINE must not contain a newline");
}
if (!LINE.trim()) {
  throw new Error("LINE must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

writeFileSync(outPath, LINE, "utf8");

// Round-trip self-check: read back and assert byte-identical with LINE.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("Round-trip self-check failed: entry.txt differs from LINE");
}

console.log(`Wrote ${outPath} (${LINE.length} characters)`);
console.log(LINE);
