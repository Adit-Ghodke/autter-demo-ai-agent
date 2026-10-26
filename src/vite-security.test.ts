import { describe, expect, test } from "vitest";
import { version as viteVersion } from "vite";

// GHSA-587h-7wmj-h5pm is fixed in Vite >= 8.3.3. The repository previously
// resolved Vite 7.x (via the vitest toolchain), so this test guards the
// security bump: it must fail on the pre-fix lockfile and pass afterwards.
function versionAtLeast(version: string, major: number, minor: number, patch: number): boolean {
  const [m, n, p] = version.split(".").map(Number);
  if (m !== major) return m > major;
  if (n !== minor) return n > minor;
  return p >= patch;
}

describe("vite security update", () => {
  test("resolves a Vite release fixing GHSA-587h-7wmj-h5pm", () => {
    expect(viteVersion).toBeTruthy();
    expect(versionAtLeast(viteVersion, 8, 3, 3)).toBe(true);
  });
});
