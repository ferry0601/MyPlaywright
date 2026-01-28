const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('test aja',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Student").check();
    await page.getByPlaceholder("Password").fill("1234Ab");
    await page.getByRole("button", {name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name:'shop'}).click();
    await page.locator("app-card").filter({hasText:'Samsung Note 8'}).getByRole("button").click();
});