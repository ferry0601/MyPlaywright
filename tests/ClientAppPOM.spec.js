const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const {POManager} = require('../pageobjects/POManager');
// JSON -> String -> JS Object
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorder.json')));



for(const data of dataSet){

    test(`E2E testing buy Item ${data.textToCart}`,async ({page})=>
    {

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username,data.password);
        await expect(loginPage.getLoginMessage()).toContainText(data.messageSuccess);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.textToCart);
        await dashboardPage.navigateCart();
        
        const cartPage = poManager.getCartPage();
        await cartPage.checkAddItem(data.textToCart);
        await cartPage.btnToCheckout();

        const orderReview = poManager.getOrderReview();
        await orderReview.chooseCountry(data.countryCode,data.countryName);
        await orderReview.verifyEmailUserId(data.username);
        const OrderId = await orderReview.submitAndGetOrderId();
        console.log(OrderId);

        await dashboardPage.navigateOrders();
        const reviewPage = poManager.getHistoryPage();
        await reviewPage.SelectOrderId(OrderId);
        
        await reviewPage.getOrderId();
        expect(OrderId.includes(await reviewPage.getOrderId())).toBeTruthy();
    });
}
    customtest.only(`E2E ClientAPP `,async ({page,testDataforOrder})=>
    {

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(testDataforOrder.username,testDataforOrder.password);
        await expect(loginPage.getLoginMessage()).toContainText(testDataforOrder.messageSuccess);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(testDataforOrder.textToCart);
        await dashboardPage.navigateCart();
        
        const cartPage = poManager.getCartPage();
        await cartPage.checkAddItem(testDataforOrder.textToCart);
        await cartPage.btnToCheckout();

        const orderReview = poManager.getOrderReview();
        await orderReview.chooseCountry(testDataforOrder.countryCode,testDataforOrder.countryName);
        await orderReview.verifyEmailUserId(testDataforOrder.username);
        const OrderId = await orderReview.submitAndGetOrderId();
        console.log(OrderId);

        await dashboardPage.navigateOrders();
        const reviewPage = poManager.getHistoryPage();
        await reviewPage.SelectOrderId(OrderId);
        
        await reviewPage.getOrderId();
        expect(OrderId.includes(await reviewPage.getOrderId())).toBeTruthy();
    });
