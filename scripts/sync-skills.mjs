import { mkdirSync, rmSync, symlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const link = join(root, ".claude", "skills");

mkdirSync(dirname(link), { recursive: true });
rmSync(link, { force: true, recursive: true });
// "junction" avoids the admin/developer-mode requirement on Windows; ignored elsewhere.
symlinkSync(join("..", ".agents", "skills"), link, "junction");

console.log(".claude/skills -> ../.agents/skills");
