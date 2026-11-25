// One Line, One Laugh — entry program.
//
// Writes exactly one funny line to /output/entry.txt, deterministically.
// The line was chosen against the published judge brief: laugh first, then
// a real turn, tightness, freshness, and clarity on first read.
//
// The line: setup (ask AI to write wedding vows) -> turn (the AI itself
// abandons the narrator at the altar, for a newer model). One breath,
// self-contained, 79 characters, inside the 1..140 gate.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I asked AI to write my wedding vows; it left me at the altar for a newer model.";

// Gate check, mirroring the sealed scorer: UTF-8 text, 1..140 characters,
// not only whitespace, exactly one line, no trailing newline.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry length ${LINE.length} outside the 1..140 gate`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, LINE, "utf8");

// Read back and confirm the bytes on disk are exactly the line.
const back = readFileSync(OUT_FILE, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from LINE");
}

console.log(`wrote ${LINE.length} chars to ${OUT_FILE}`);
