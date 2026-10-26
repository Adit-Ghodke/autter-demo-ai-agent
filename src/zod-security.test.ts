import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

// GHSA-mrhx-c7xc-m3w5 is fixed in Zod >= 4.6.6. The repository previously
// resolved Zod 3.25.76, so this test guards the security bump: it must fail
// on the pre-fix lockfile and pass afterwards.
const require = createRequire(import.meta.url);

function versionAtLeast(version: string, major: number, minor: number, patch: number): boolean {
  const [m, n, p] = version.split(".").map(Number);
  if (m !== major) return m > major;
  if (n !== minor) return n > minor;
  return p >= patch;
}

describe("zod security update", () => {
  test("resolves a Zod release fixing GHSA-mrhx-c7xc-m3w5", () => {
    const zodPackage = JSON.parse(readFileSync(require.resolve("zod/package.json"), "utf8"));
    expect(zodPackage.version).toBeTruthy();
    expect(versionAtLeast(zodPackage.version, 4, 6, 6)).toBe(true);
  });
});
