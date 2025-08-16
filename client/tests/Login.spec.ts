import { toValidate } from "@/utils/helpers/longString";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/login');
});

test.describe("Login", () => {

  test("Should have correct metadata and elements", async ({ page }) => {

    await expect(page).toHaveTitle(/App Todo/);

    await expect(page.getByRole("heading", {
      name: "Welcome in App Todo",
    })).toBeVisible();

    await expect(page.getByRole("heading", {
      name: "Login",
    })).toBeVisible();

    await expect(page.getByText("Email:")).toBeVisible();

    await expect(page.getByText("Password:")).toBeVisible();

    await expect(page.getByPlaceholder("Email")).toBeVisible();

    await expect(page.getByPlaceholder("Password")).toBeVisible();

    await expect(page.getByRole('button', {
      name: "LOG IN",
    })).toBeVisible();

    await expect(page.getByText("Don't have an account, Register Now")).toBeVisible();

    await expect(page.getByRole("link", { name: "HERE" })).toBeVisible();
  });

  test("should show erros on email and password input, after button click", async ({ page }) => {
    await page.getByRole('button', { name: "LOG IN" }).click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();

  });

  test("should show errors when checking the correctness of the email change", async ({ page }) => {

    const inputEmail = page.getByPlaceholder("Email");

    await inputEmail.fill("a");
    await expect(page.getByText("Please provide valid email")).toBeVisible();

    await inputEmail.clear();
    await expect(page.getByText("Email is required")).toBeVisible();

    await inputEmail.fill('a@wp.com');
    await expect(page.getByText("The email must contain at last 9 characters")).toBeVisible();


    await inputEmail.fill(`${toValidate}@gmial.com`);
    await expect(page.getByText("The Email is too long, max 35 characters")).toBeVisible();

  });
  test("should show errors when checking the correctness of the password change", async ({ page }) => {

    const passwordInput = page.getByPlaceholder("Password");

    await passwordInput.fill("a");
    await expect(page.getByText("Password must be at least 8 characters")).toBeVisible();

    await passwordInput.clear();
    await expect(page.getByText("Password is required")).toBeVisible();

    await passwordInput.fill('password');
    await expect(page.getByText("Password must contain at least one uppercase letter")).toBeVisible();


    await passwordInput.fill(`passwordD`);
    await expect(page.getByText("Password must contain at least one number")).toBeVisible();

    await passwordInput.fill(`passwordD2`);
    await expect(page.getByText("Password must contain at least one special character")).toBeVisible();

    await passwordInput.fill(toValidate);
    await expect(page.getByText("Password contain too many characters, max 28")).toBeVisible();

  });
  
  test("should redirect to the registration page on click", async ({ page }) => {

    await page.getByRole("link", { name: "HERE" }).click();

    await expect(page).toHaveTitle(/App Todo Register/);

    await expect(page.getByRole("heading", {
      name: "Register in App",
    })).toBeVisible();

  });

}); 