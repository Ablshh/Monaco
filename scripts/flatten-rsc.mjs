import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const f of readdirSync(p)) {
        if (f.endsWith(".txt")) copyFileSync(join(p, f), join(dir, `${name}.${f}`));
      }
    }
    walk(p);
  }
}

walk("out");
