import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const TEXT = "I told my boss I was blocked, so he scheduled a meeting to unblock me. Now I'm blocked by the unblocking meeting.";

// Validasi: 1-200 karakter, satu baris (tanpa \n / \r)
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`TEXT harus 1-200 karakter, dapat ${TEXT.length}`);
}
if (TEXT.includes("\n") || TEXT.includes("\r")) {
  throw new Error("TEXT harus satu baris");
}

const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT + "\n", "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== TEXT + "\n") {
  throw new Error("entry.txt tidak byte-identik dengan TEXT + newline");
}
if (Buffer.byteLength(back, "utf8") !== Buffer.byteLength(TEXT, "utf8") + 1) {
  throw new Error("panjang byte entry.txt tidak cocok");
}
console.log(`OK: ${TEXT.length} karakter -> ${outPath}`);
