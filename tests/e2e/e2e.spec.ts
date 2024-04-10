import { test, expect } from "@playwright/test";

test("should be able to load all pages", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();

  await page.getByRole("link", { name: "Menu" }).click();
  await expect(page.getByRole("heading", { name: "Menu" })).toBeVisible();

  await expect(page.getByText("21 foods found")).toBeVisible();
});

test("should be able to search for foods in a case-insensitive manner and filter via tags", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/menu");
  await page.getByPlaceholder("Search").fill("burger");
  await expect(page.getByText("1 foods found")).toBeVisible();
  await expect(page.getByText("Burger", { exact: true })).toBeVisible();

  // Clear the search
  await page.getByPlaceholder("Search").fill("");
  await expect(page.getByText("21 foods found")).toBeVisible();

  // Filter by tag
  await page.getByLabel("Filter by tag").selectOption({ label: "Breakfast" });
  await expect(page.getByText("1 foods found")).toBeVisible();
  await expect(
    page.getByText("Banana Blueberry French Toast", { exact: true })
  ).toBeVisible();
});

test("generated test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
  await page.getByRole("link", { name: "Menu" }).click();
  await expect(page.getByRole("heading", { name: "Menu" })).toBeVisible();
  await expect(page.getByText("foods found")).toBeVisible();
  await page.getByPlaceholder("Search").click();
  await page.getByPlaceholder("Search").fill("Burger");
  await expect(page.getByText("foods found")).toBeVisible();
  await page.getByPlaceholder("Search").fill("");
  await page.getByLabel("Filter by tag").selectOption("Alcoholic");
  await expect(page.getByText("foods found")).toBeVisible();
});
