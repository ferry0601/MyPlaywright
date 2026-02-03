const {test, expect} = require('@playwright/test');
const {LoginPage} = require("../pageobjects/LoginPage");
const { log } = require('node:console');
const { DashboardPage } = require('../pageobjects/DashboardPage');


const username = "waferr@gmail.com";
const password = "Iamking@000";

test.beforeEach('test login',async ({page}) => {
    const messageSuccess = " Login Successfully ";
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
    await expect(loginPage.getLoginMessage()).toContainText(messageSuccess);
    
});

test('E2E testing buy Item',async ({page})=>
{
    const textToCart = "iphone 13 pro";
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProductAddCart(textToCart);
    await dashboardPage.navigateCart();

    
    await page.locator("div li").first().waitFor();
    const adaAddItem = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(adaAddItem).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Select Country']").pressSequentially("Ind",{delay:100});
    const btnDropdown = page.locator(".ta-results");
    await btnDropdown.waitFor();
    const countBtnDropdown = await btnDropdown.locator("button").count();

    for(let i=0;i<countBtnDropdown;++i){
        const text = await btnDropdown.locator("button").nth(i).textContent();
        if(text.includes("Indonesia")){
            await btnDropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(await orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").first().waitFor();
    const rows = await page.locator("tbody tr");

    for(let i=0;i<await rows.count();++i){
        const rowsOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowsOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    await page.locator(".col-text").waitFor();
    const orderIdDetails = await page.locator(".col-text").textContent();
    await expect(orderId.includes(orderIdDetails)).toBeTruthy();
});


