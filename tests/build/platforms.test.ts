import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const OUTPUT = resolve(ROOT, ".output");

function clean() {
  if (existsSync(OUTPUT)) {
    rmSync(OUTPUT, { recursive: true, force: true });
  }
}

function build(platform: string) {
  execSync(`PLATFORM=${platform} npx vinxi build`, {
    cwd: ROOT,
    stdio: "pipe",
    env: { ...process.env, PLATFORM: platform },
    timeout: 120_000,
  });
}

describe("platform builds", () => {
  it("builds for web (SSR)", () => {
    clean();
    build("web");
    expect(existsSync(resolve(OUTPUT, "server"))).toBe(true);
    expect(existsSync(resolve(OUTPUT, "server", "index.mjs"))).toBe(true);
    expect(existsSync(resolve(OUTPUT, "public"))).toBe(true);
  });

  it("builds for mobile (SPA with index.html)", () => {
    clean();
    build("mobile");
    const indexPath = resolve(OUTPUT, "public", "index.html");
    expect(existsSync(indexPath)).toBe(true);

    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain("<html");
    expect(html).toContain('<div id="app">');
    // SPA: app div should be empty (client-side rendered via HashRouter)
    expect(html).toContain('<div id="app"></div>');
    // Must include the client JS bundle
    expect(html).toContain('<script type="module"');
  });

  it("builds for desktop (SPA with index.html)", () => {
    clean();
    build("desktop");
    const indexPath = resolve(OUTPUT, "public", "index.html");
    expect(existsSync(indexPath)).toBe(true);

    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain("<html");
    expect(html).toContain('<div id="app"></div>');
    expect(html).toContain('<script type="module"');
  });
});
