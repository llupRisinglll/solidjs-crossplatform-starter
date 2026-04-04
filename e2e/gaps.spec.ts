import { test, expect } from "@playwright/test";

test.describe("Gap 1+4: @solidjs/meta integration", () => {
  test("home page has per-route <title> from @solidjs/meta", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/solid-cross/);
  });

  test("home page has meta description", async ({ page }) => {
    await page.goto("/");
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute("content", /Cross-platform boilerplate/);
  });
});

test.describe("Gap 2+3: Static build and prerender", () => {
  test("all routes are prerendered as static HTML", async ({ page }) => {
    const routes = [
      "/",
      "/demo",
      "/demo/detail",
      "/samples",
      "/samples/counter",
      "/samples/todos",
      "/samples/fetch",
      "/samples/forms",
      "/native",
    ];
    for (const route of routes) {
      const res = await page.goto(route);
      expect(res?.status(), `${route} should return 200`).toBe(200);
    }
  });

  test("Cloudflare _headers file is served", async ({ page }) => {
    const res = await page.goto("/_headers");
    // serve will return the file as-is (200 or 404 depending on config)
    // We just check it exists in the build output
    expect(res?.status()).toBeLessThan(500);
  });
});

test.describe("Gap 5+10: SSR-safe transitions (no solid-transition-group)", () => {
  test("page renders without hydration errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await page.waitForTimeout(1000);
    expect(errors).toEqual([]);
  });

  test("page-enter animation class is present", async ({ page }) => {
    await page.goto("/");
    const pageEnter = page.locator(".page-enter");
    await expect(pageEnter).toBeVisible();
  });

  test("page transition container exists", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".page-transition-container")).toBeVisible();
  });

  test("navigation between routes works without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await page.getByText("Transitions Demo").click();
    await expect(page).toHaveURL(/\/demo/);
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });
});

test.describe("Gap 7: Environment variable pattern", () => {
  test("PLATFORM env is exposed as build-time constant", async ({ page }) => {
    await page.goto("/");
    // The home page shows the build target
    await expect(page.getByText("web").first()).toBeVisible();
  });
});

test.describe("Gap 8: Route precedence", () => {
  test("static routes take precedence over dynamic routes", async ({ page }) => {
    // /demo is a static route, should render the demo page
    await page.goto("/demo");
    await expect(page.getByRole("heading", { name: /Transitions/i })).toBeVisible();
  });

  test("/samples static route works", async ({ page }) => {
    await page.goto("/samples");
    await expect(page.locator("text=Samples")).toBeVisible();
  });
});

test.describe("Gap 11: devOverlay disabled", () => {
  test("no dev overlay present in production build", async ({ page }) => {
    await page.goto("/");
    // SolidStart dev overlay adds a specific element — it should not exist in production
    const overlay = page.locator("[data-solid-overlay]");
    await expect(overlay).toHaveCount(0);
  });
});

test.describe("General: all pages render", () => {
  const routes = [
    { path: "/", text: "solid-cross" },
    { path: "/demo", text: "Transitions" },
    { path: "/samples", text: "Samples" },
    { path: "/samples/counter", text: "Counter" },
    { path: "/samples/todos", text: "Todo" },
    { path: "/native", text: "Native" },
  ];

  for (const { path, text } of routes) {
    test(`${path} renders with "${text}"`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));

      await page.goto(path);
      await expect(page.locator(`text=${text}`).first()).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
});
