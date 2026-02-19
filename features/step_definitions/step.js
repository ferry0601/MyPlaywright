const {When, Then, Given} = require('@cucumber/cucumber');
const {POManager} = require('../../pageobjects/POManager');
const {test, expect, chromium} = require('@playwright/test');

const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000); // 60 detik



Given('a login ecommerce with {string} and {string} and expect {string}', async function(username,password,messageSuccess){
    
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
    await expect(loginPage.getLoginMessage()).toContainText(messageSuccess);
});

When('add {string} to cart', async function (textToCart) {
// Write code here that turns the phrase above into concrete actions
    const dashboardPage = this.poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(textToCart);
        await dashboardPage.navigateCart();
});

Then('verify {string} is displayed in the cart', async function (textToCart) {
           // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
        await cartPage.checkAddItem(textToCart);
        await cartPage.btnToCheckout();
});

When('enter valid details and place order {string} and {string} and {string}', async function (countryCode,countryName,username) {
           // Write code here that turns the phrase above into concrete actions
    const orderReview = this.poManager.getOrderReview();
        await orderReview.chooseCountry(countryCode,countryName);
        await orderReview.verifyEmailUserId(username);
        this.OrderId = await orderReview.submitAndGetOrderId();
        console.log(this.OrderId);
});

Then('verify order in orderhistory', async function () {
           // Write code here that turns the phrase above into concrete actions
        const dashboardPage = this.poManager.getDashboardPage();
        await dashboardPage.navigateOrders();
        const reviewPage = this.poManager.getHistoryPage();
        await reviewPage.SelectOrderId(this.OrderId);
        
        await reviewPage.getOrderId();
        expect(this.OrderId.includes(await reviewPage.getOrderId())).toBeTruthy();
        
});


Given('a login ecommerce2 with {string} and {string}', async function(username,password){
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await this.page.locator("#username").fill(username);
    await this.page.locator("[type='password']").fill(password);
    await this.page.locator("#signInBtn").click();
    

});

    Then('verify error message is diplayed', async function () {
        console.log(await this.page.locator("[style*='block']").textContent());
        await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');

    });