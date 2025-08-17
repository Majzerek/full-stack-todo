import {
  emailAdmin,
  correctPass,
  longString,
  today,
  taskTitle,
  taskDesc200,
  hashTag,
  tomorrow,
} from "../src/utils/helpers/testStrings";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  const inputEmail = page.getByPlaceholder("Email");
  const passwordInput = page.getByPlaceholder("Password");

  await inputEmail.fill(emailAdmin);
  await passwordInput.fill(correctPass);

  await page.getByRole("button", { name: "LOG IN" }).click();
  await expect(page).toHaveTitle("App Todo Dashboard");

  await page.getByRole("link", { name: /NEW TASK/ }).click();
});

test.describe("New Task page", () => {
  test("should have correct metadata and elements", async ({ page }) => {
    await expect(page).toHaveTitle("App Todo New-Task");

    await expect(
      page.getByRole("heading", { name: /Here you can add new task./ }),
    ).toBeVisible();
    await expect(page.getByPlaceholder(/Title for task/)).toBeVisible();
    await expect(page.getByPlaceholder(/Description for task/)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Add Hashtag/ }),
    ).toBeVisible();

    await expect(page.getByTitle("Pick a Date")).toBeVisible();
    await expect(page.getByRole("button", { name: /Add task/ })).toBeVisible();
  });

  test("should show erros on inputs, after button click", async ({ page }) => {
    await page.getByRole("button", { name: "ADD TASK" }).click();

    await expect(page.getByText(/Title is a required field/)).toBeVisible();
    await expect(
      page.getByText(/Description is a required field/),
    ).toBeVisible();
    await expect(page.getByText(/Date is required/)).toBeVisible();

    await page.getByRole("button", { name: "ADD HASHTAG" }).click();
    await expect(
      page.getByText("hashTag[0] is a required field"),
    ).toBeVisible();
  });

  test("should show errors when checking the correctness of inputs", async ({
    page,
  }) => {
    const inputTitle = page.getByPlaceholder("Title for task");
    const inputDesc = page.getByPlaceholder("Description for task");

    await inputTitle.fill("a");
    await expect(page.getByText("Minimum 3 characters.")).toBeVisible();

    await inputTitle.fill(longString);
    await expect(page.getByText("Max 20 characters.")).toBeVisible();

    await inputDesc.fill("a");
    await expect(page.getByText("Minimum 10 characters")).toBeVisible();

    await inputDesc.fill(
      longString + longString + longString + longString + longString,
    );
    await expect(page.getByText("Max 400 characters")).toBeVisible();

    await page.getByRole("button", { name: "ADD HASHTAG" }).click();
    const inputHash = page.getByTitle("hashTag.1");
    await inputHash.fill("a");
    await expect(page.getByText("Minimum 3 characters")).toBeVisible();

    await inputHash.fill(longString);
    await expect(page.getByText("Max 15 characters")).toBeVisible();

    await page.getByTitle(/Pick a Date/).click();
    await page.getByText(today).click();
    await expect(
      page.getByText(/Date must be at least tomorrow./),
    ).toBeVisible();
  });

  test("should correctly add new task", async ({ page }) => {
    page.reload();
    const inputTitle = page.getByPlaceholder("Title for task");
    const inputDesc = page.getByPlaceholder("Description for task");

    await inputTitle.fill(taskTitle);
    await inputDesc.fill(taskDesc200);

    await page.getByRole("button", { name: "ADD HASHTAG" }).click();
    const inputHash = page.getByTitle("hashTag.1");
    await inputHash.fill(hashTag);

    await page.getByTitle(/Pick a Date/).click();
    await page.getByText(tomorrow).click();

    await page.getByRole("button", { name: "ADD TASK" }).click();

    await expect(page.getByText("Task created")).toBeVisible();
    await page.getByRole("link", { name: /TODO/ }).click();

    await expect(page).toHaveTitle(/App Todo List/);
    await expect(page.getByText(/NEW ONE/)).toBeVisible();
    await expect(page.getByText(/Is Done: /)).toBeVisible();
  });
});
