import { test, expect } from "@playwright/test";

/*
Test Case
1. E2E Register
2. Error Message Displayed If Field Is Empty
3. Error Message When Name Is Under 5 Characters
4. Error Message When Phone Number Is Under 10 Characters
5. Error Message When Phone Number Is More Than 12 Characters
6. Error Message When Business Name Is Under 5 Characters
7. Error Message When Email Is Invalid
8. Error Message When Password Is Under 8 Characters
9. Error Message When Password Does Not Contain Numbers
10. Confirm Password Should Show Error If Not The Same As Password
*/

test("E2E Register", async ({ page }) => {
  await page.goto("https://dashboard.melaka.app/register");

  const testData = {
    name: "Edison Valentino",
    phone: "812345678921",
    businessName: "Melaka Store",
    email: "edison.valentino@example.com",
    password: "Password123!",
  };

  //Locator Definitions using XPath
  const nameInput = page.locator(
    '//input[@data-testid="register__text-field__name"]'
  );
  const phoneInput = page.locator(
    '//input[@data-testid="register__text-field__phone-number"]'
  );
  const businessNameInput = page.locator(
    '//input[@data-testid="register__text-field__business-name"]'
  );

  const distributorRadioDistributor = page.locator(
    '//input[@data-testid="register__radio-button__distributor"]'
  );
  const distributorRadioTokoRetail = page.locator(
    '//input[@data-testid="register__radio-button__toko-retail"]'
  );
  const distributorRadioBrand = page.locator(
    '//input[@data-testid="register__radio-button__brand"]'
  );
  const distributorRadioPenjualOnline = page.locator(
    '//input[@data-testid="register__radio-button__penjual-online"]'
  );

  const emailInput = page.locator(
    '//input[@data-testid="register__text-field__email"]'
  );
  const passwordInput = page.locator(
    '//input[@data-testid="register__text-field__password"]'
  );
  const confirmPasswordInput = page.locator(
    '//input[@data-testid="register__text-field__confirm-password"]'
  );
  const termsCheckbox = page.locator(
    '//input[@data-testid="register__checkbox__tnc"]'
  );
  const registerButton = page.locator(
    '//button[@data-testid="register__button__sign-up"]'
  );

  //Assertions: Verifikasi elemen ada
  await expect(nameInput).toBeVisible();
  await expect(phoneInput).toBeVisible();
  await expect(businessNameInput).toBeVisible();
  await expect(distributorRadioDistributor).toBeVisible();
  await expect(distributorRadioTokoRetail).toBeVisible();
  await expect(distributorRadioBrand).toBeVisible();
  await expect(distributorRadioPenjualOnline).toBeVisible();
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(confirmPasswordInput).toBeVisible();
  await expect(termsCheckbox).toBeVisible();
  await expect(registerButton).toBeVisible();

  //Fill form
  await nameInput.fill(testData.name);
  await phoneInput.fill(testData.phone);
  await businessNameInput.fill(testData.businessName);
  await distributorRadioDistributor.check();
  await emailInput.fill(testData.email);
  await passwordInput.fill(testData.password);
  await confirmPasswordInput.fill(testData.password);
  await termsCheckbox.check();

  //Best practice to assert next page after register, but limited to production env
});

//For showcase purpose only
//Negative code will not using xpath and instead directly find test ID

test("error message displayed if field empty", async ({ page }) => {
  await page.goto("https://dashboard.melaka.app/register");

  await page.getByTestId("register__checkbox__tnc").click();
  await page.getByTestId("register__button__sign-up").click();

  await expect(
    page.getByTestId("register__text-field__name__error")
  ).toContainText("Wajib diisi");

  await expect(
    page.getByTestId("register__text-field__phone-number__error")
  ).toContainText("Wajib diisi");

  await expect(
    page.getByTestId("register__text-field__business-name__error")
  ).toContainText("Wajib diisi");

  await expect(
    page.getByTestId("register__text-field__email__error")
  ).toContainText("Wajib diisi");

  await expect(
    page.getByTestId("register__text-field__password__error")
  ).toContainText("Wajib diisi");

  await expect(
    page.getByTestId("register__text-field__confirm-password__error")
  ).toContainText("Wajib diisi");
});

test("error message name under 5 char", async ({ page }) => {
  await page.goto("https://dashboard.melaka.app/register");

  await page.fill('input[data-testid="register__text-field__name"]', "edi");

  await page.getByTestId("register__checkbox__tnc").click();
  await page.getByTestId("register__button__sign-up").click();

  await expect(
    page.getByTestId("register__text-field__name__error")
  ).toContainText("min. 5 karakter.");
});

test("error message phone number under 10 char", async ({ page }) => {
  await page.goto("https://dashboard.melaka.app/register");

  await page.fill(
    'input[data-testid="register__text-field__phone-number"]',
    "123"
  );

  await page.getByTestId("register__checkbox__tnc").click();
  await page.getByTestId("register__button__sign-up").click();

  await expect(
    page.getByTestId("register__text-field__phone-number__error")
  ).toContainText("tidak boleh kurang dari 10");
});

test("error meesage phone number more than 10 char", async ({
  page,
}) => {
  await page.goto("https://dashboard.melaka.app/register");

  await page.fill(
    'input[data-testid="register__text-field__phone-number"]',
    "12345678987765"
  );

  await page.getByTestId("register__checkbox__tnc").click();
  await page.getByTestId("register__button__sign-up").click();

  await expect(
    page.getByTestId("register__text-field__phone-number__error")
  ).toContainText(" lebih dari 12 karakter");
});

test("error message business name under 5 char", async ({
  page,
}) => {
  await page.goto("https://dashboard.melaka.app/register");

  await page.fill(
    'input[data-testid="register__text-field__business-name"]','tahu'
  );

  await page.getByTestId("register__checkbox__tnc").click();
  await page.getByTestId("register__button__sign-up").click();

  await expect(
    page.getByTestId("register__text-field__business-name__error")
  ).toContainText("tidak boleh kurang dari 5 karakter.");
});

test("error message invalid email", async ({ page }) => {
  await page.goto("https://dashboard.melaka.app/register");

  await page.fill(
    'input[data-testid="register__text-field__email"]',
    'autoauto.com'
  );

  await page.getByTestId("register__checkbox__tnc").click();
  await page.getByTestId("register__button__sign-up").click();

  await expect(
    page.getByTestId("register__text-field__email__error")
  ).toContainText("Harap isi dengan format yang benar.");
});

test("error message pass under 8 char", async ({ page }) => {
  await page.goto("https://dashboard.melaka.app/register");

  await page.fill(
    'input[data-testid="register__text-field__password"]',
    "hehe22"
  );

  await page.getByTestId("register__checkbox__tnc").click();
  await page.getByTestId("register__button__sign-up").click();

  await expect(
    page.getByTestId("register__text-field__password__error")
  ).toContainText("Min. 8 karakter, harus kombinasi dari huruf dan angka.");
});

test("error message pass no numb", async ({ page }) => {
  await page.goto("https://dashboard.melaka.app/register");

  await page.fill(
    'input[data-testid="register__text-field__password"]',
    "hahahahahaha"
  );

  await page.getByTestId("register__checkbox__tnc").click();
  await page.getByTestId("register__button__sign-up").click();

  await expect(
    page.getByTestId("register__text-field__password__error")
  ).toContainText("Min. 8 karakter, harus kombinasi dari huruf dan angka.");
});

test(`confirm password should show error if not the same as password`, async ({
  page,
}) => {
  await page.goto("https://dashboard.melaka.app/register");

  await page.fill(
    'input[data-testid="register__text-field__password"]',
    'HAHAHA'
  );

  await page.fill(
    'input[data-testid="register__text-field__confirm-password"]',
    'hihihihi'
  );

  await page.getByTestId("register__checkbox__tnc").click();
  await page.getByTestId("register__checkbox__tnc").click();
  await page.getByTestId("register__button__sign-up").click();

  await expect(
    page.getByTestId("register__text-field__confirm-password__error")
  ).toContainText("Belum sesuai dengan kata sandi.");
});