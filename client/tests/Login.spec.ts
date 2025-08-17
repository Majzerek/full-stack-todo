import {
  correctPass,
  emailAdmin,
  emailBlock,
  emailLong,
  emailNotExist,
  emailShort,
  emailWaiting,
  longString,
  passwordNotExist,
} from "@/utils/helpers/testStrings";

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/login");
});

test.describe("Login Page", () => {
  test("should have correct metadata and elements", async ({ page }) => {
    await expect(page).toHaveTitle(/App Todo Login/);

    await expect(
      page.getByRole("heading", {
        name: "Welcome in App Todo",
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Login",
      }),
    ).toBeVisible();

    await expect(page.getByText("Email:")).toBeVisible();

    await expect(page.getByText("Password:")).toBeVisible();

    await expect(page.getByPlaceholder("Email")).toBeVisible();

    await expect(page.getByPlaceholder("Password")).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "LOG IN",
      }),
    ).toBeVisible();

    await expect(
      page.getByText("Don't have an account, Register Now"),
    ).toBeVisible();

    await expect(page.getByRole("link", { name: "HERE" })).toBeVisible();
  });

  test("should show erros on email and password input, after button click", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "LOG IN" }).click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("should show errors when checking the correctness of the email change", async ({
    page,
  }) => {
    const inputEmail = page.getByPlaceholder("Email");

    await inputEmail.fill("a");
    await expect(page.getByText("Please provide valid email")).toBeVisible();

    await inputEmail.clear();
    await expect(page.getByText("Email is required")).toBeVisible();

    await inputEmail.fill(emailShort);
    await expect(
      page.getByText("The email must contain at last 9 characters"),
    ).toBeVisible();

    await inputEmail.fill(emailLong);
    await expect(
      page.getByText("The Email is too long, max 35 characters"),
    ).toBeVisible();
  });

  test("should show errors when checking the correctness of the password change", async ({
    page,
  }) => {
    const passwordInput = page.getByPlaceholder("Password");

    await passwordInput.fill("a");
    await expect(
      page.getByText("Password must be at least 8 characters"),
    ).toBeVisible();

    await passwordInput.clear();
    await expect(page.getByText("Password is required")).toBeVisible();

    await passwordInput.fill("password");
    await expect(
      page.getByText("Password must contain at least one uppercase letter"),
    ).toBeVisible();

    await passwordInput.fill("passwordD");
    await expect(
      page.getByText("Password must contain at least one number"),
    ).toBeVisible();

    await passwordInput.fill("passwordD2");
    await expect(
      page.getByText("Password must contain at least one special character"),
    ).toBeVisible();

    await passwordInput.fill(longString);
    await expect(
      page.getByText("Password contain too many characters, max 28"),
    ).toBeVisible();
  });

  test("should show info about not found user if not exist", async ({
    page,
  }) => {
    const inputEmail = page.getByPlaceholder("Email");
    const passwordInput = page.getByPlaceholder("Password");

    await inputEmail.fill(emailNotExist);
    await passwordInput.fill(passwordNotExist);

    await page.getByRole("button", { name: "LOG IN" }).click();
    await expect(page.getByText("User not found")).toBeVisible();
  });

  test("should show info about wrong credencials", async ({ page }) => {
    const inputEmail = page.getByPlaceholder("Email");
    const passwordInput = page.getByPlaceholder("Password");

    await inputEmail.fill(emailAdmin);
    await passwordInput.fill(passwordNotExist);

    await page.getByRole("button", { name: "LOG IN" }).click();
    await expect(page.getByText("Wrong credentials")).toBeVisible();
  });

  test("should be greeted and redirect to WaitForAprove page", async ({
    page,
  }) => {
    const inputEmail = page.getByPlaceholder("Email");
    const passwordInput = page.getByPlaceholder("Password");

    await inputEmail.fill(emailWaiting);
    await passwordInput.fill(correctPass);

    await page.getByRole("button", { name: "LOG IN" }).click();
    await expect(page.getByText("Welcome waiting")).toBeVisible();

    await expect(page).toHaveTitle("App Todo Wait");
    await expect(
      page.getByText(
        "We're sorry, but your account is still waiting to be confirmed.",
      ),
    ).toBeVisible();
  });

  test("should be see info about being blocked", async ({ page }) => {
    const inputEmail = page.getByPlaceholder("Email");
    const passwordInput = page.getByPlaceholder("Password");

    await inputEmail.fill(emailBlock);
    await passwordInput.fill(correctPass);

    await page.getByRole("button", { name: "LOG IN" }).click();

    await expect(page.getByText("Account has been blocked")).toBeVisible();
  });

  test("should be greeted and redirect to Dashboard page", async ({ page }) => {
    const inputEmail = page.getByPlaceholder("Email");
    const passwordInput = page.getByPlaceholder("Password");

    await inputEmail.fill(emailAdmin);
    await passwordInput.fill(correctPass);

    await page.getByRole("button", { name: "LOG IN" }).click();
    await expect(page.getByText(/Welcome ADMIN/)).toBeVisible();

    await expect(page).toHaveTitle("App Todo Dashboard");
    await expect(page.getByText("USERS")).toBeVisible(); // only admins see it.
  });

  test("should redirect to the registration page on click", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "HERE" }).click();

    await expect(page).toHaveTitle(/App Todo Register/);

    await expect(
      page.getByRole("heading", {
        name: "Register in App",
      }),
    ).toBeVisible();
  });
});
