const {test, expect} = require('@playwright/test');
const { request } = require('node:http');
const { title } = require('node:process');

// test('First test case playwright with browser context', async ({browser})=>
// {
  
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     console.log(await page.title());
// });

let userName;
let passWord;
let checkBox;
let btnSignIn;
let judule;

// test.beforeEach(async ({page}) => {
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     console.log(await page.title());

//     userName = page.locator("#username");
//     passWord = page.locator("[type='password']");
//     checkBox = page.locator("#terms");
//     btnSignIn = page.locator("#signInBtn");
    
// });

test('Simple failed login browser with page default', async ({page})=>
{
    await userName.fill("ferry");
    await passWord.fill("pass123");
    await checkBox.check();
    await btnSignIn.click();

    const errorMassage = page.locator("[style*='block']");
    console.log(await errorMassage.textContent());
    await expect(errorMassage).toContainText('Incorrect username/password.');
});

test('Login valid', async({page})=>
{
    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    await checkBox.check();
    await btnSignIn.click();
    

    judule = page.locator("a.navbar-brand").first();
    const cardTitle = page.locator(".card-title a");
    
    console.log(await judule.textContent());
    await expect(judule).toContainText('ProtoCommerce');

    //console.log(await cardTitle.nth(1).textContent());
    console.log(await cardTitle.allTextContents());


});

test('just basic',async ({page}) =>
{
    //await page.route("**/*.{jpg,jpeg,png}",route=> route.abort());
    page.on('request',request=>console.log(request.url()));
    page.on('response',response=>console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    console.log(await userName.inputValue());
    const passWord = page.locator("[type='password']");
    const blinkLink = page.locator("[href*='documents-request']");
    const asUser = page.locator(".radiotextsty");
    await expect(blinkLink).toHaveAttribute("class","blinkingText");
    await asUser.last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect (page.locator(".radiotextsty").last()).toBeChecked();
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("teach");
    await page.locator("#terms").check();
    expect(await page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //await page.pause();
});

test('two browser',async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), //listener atau siap untuk record kejadian
            blinkLink.click()
        ]);
    const text = await newPage.locator(".red").textContent();
    const textArray = text.split("at ");
    const email = textArray[1].split(" ")[0]
    console.log(email);
    await userName.fill(email);
    await page.pause();
    console.log(await userName.inputValue());
    
});
