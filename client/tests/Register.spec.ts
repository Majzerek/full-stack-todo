import { correctPass, emailAdmin, emailLong, emailShort, longString, name, surname } from "../src/utils/helpers/testStrings";

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/register");
});
test.describe("Register Page", () => {

  test("should have correct metadata and elements", async ({ page }) => {
    await expect(page).toHaveTitle("App Todo Register");

    await expect(
      page.getByRole("heading", {
        name: "Register in App",
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "FORM",
      }),
    ).toBeVisible();

    await expect(page.getByTestId("label-name")).toBeVisible();
    await expect(page.getByTestId("label-surname")).toBeVisible();
    await expect(page.getByTestId("label-email")).toBeVisible();
    await expect(page.getByTestId("label-phone")).toBeVisible();
    await expect(page.getByTestId("label-pass")).toBeVisible();
    await expect(page.getByTestId("label-confirm")).toBeVisible();

    await expect(page.getByPlaceholder("First Name")).toBeVisible();
    await expect(page.getByPlaceholder("Last Name")).toBeVisible();
    await expect(page.getByTitle("Email")).toBeVisible();
    await expect(page.getByTitle("Phone-Number")).toBeVisible();
    await expect(page.getByTestId("input-password1")).toBeVisible();
    await expect(page.getByTestId("input-password2")).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "CREATE",
      }),
    ).toBeVisible();

    await expect(page.getByRole("link", { name: "BACK" })).toBeVisible();
  });

  test("should show erros on inputs, after button click", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "CREATE" }).click();

    await expect(page.getByText(/Name is required/)).toBeVisible();
    await expect(page.getByText(/Surname is required/)).toBeVisible();
    await expect(page.getByText(/Email is required/)).toBeVisible();
    await expect(page.getByText(/Password is required/)).toBeVisible();
    await expect(page.getByText(/Please confirm your password/)).toBeVisible();
  });


  test("should show errors when checking the correctness of inputs", async ({
    page,
  }) => {
    const inputName = page.getByTestId("label-name");
    const inputSurname = page.getByTestId("label-surname");
    const inputEmail = page.getByTestId("label-email");
    const inputPass = page.getByTestId("label-pass");
    const inputCornifrm = page.getByTestId("label-confirm");

    await inputName.fill("a");
    await expect(page.getByText("Name must contain at lest 2 characters")).toBeVisible();

    await inputName.fill(longString);
    await expect(
      page.getByText("Name can contain max 20 characters"),
    ).toBeVisible();


    await inputSurname.fill("a");
    await expect(page.getByText("Surname must contain at lest 2 characters")).toBeVisible();

    await inputSurname.fill(longString);
    await expect(
      page.getByText("Surname can contain max 20 characters"),
    ).toBeVisible();

    await inputEmail.fill("a");
    await expect(page.getByText("Please provide valid email")).toBeVisible();

    await inputEmail.fill(emailShort);
    await expect(
      page.getByText(/Email must contain at lest 9 characters/),
    ).toBeVisible();

    await inputEmail.fill(emailLong);
    await expect(
      page.getByText(/Email is too long, max 35 characters/),
    ).toBeVisible();

    await inputPass.fill("a");
    await expect(
      page.getByText(/Password must be at least 8 characters/),
    ).toBeVisible();

    await inputPass.fill("somestring");
    await expect(
      page.getByText(/One uppercase, One number and One special case character/),
    ).toBeVisible();

    await inputPass.fill(longString);
    await expect(
      page.getByText(/Password contain too many characters, max 28/),
    ).toBeVisible();

    await inputCornifrm.fill("aa");
    await expect(
      page.getByText(/Passwords don't match/),
    ).toBeVisible();
  });

  test("should show errors when email is already in data base", async ({
    page,
  }) => {
    const inputName = page.getByTestId("label-name");
    const inputSurname = page.getByTestId("label-surname");
    const inputEmail = page.getByTestId("label-email");
    const inputPass = page.getByTestId("label-pass");
    const inputCornifrm = page.getByTestId("label-confirm");

    await inputName.fill(name);
    await inputSurname.fill(surname);
    await inputEmail.fill(emailAdmin);
    await inputPass.fill(correctPass);
    await inputCornifrm.fill(correctPass);

    await page.getByRole("button", { name: "CREATE" }).click();

    await expect(page.getByText("Email already existing!")).toBeVisible();
  });

  test("should redirect to the login page on click", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "BACK" }).click();

    await expect(page).toHaveTitle(/App Todo Login/);

    await expect(
      page.getByRole("heading", {
        name: "Welcome in App Todo",
      }),
    ).toBeVisible();
  });
});