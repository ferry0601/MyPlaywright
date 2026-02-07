const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');


const username = "waferr@gmail.com";
const password = "Iamking@000";


test.beforeEach('test login',async ({page}) => {
    const poManager = new POManager(page);
    const messageSuccess = " Login Successfully ";
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
    await expect(loginPage.getLoginMessage()).toContainText(messageSuccess);
    
});

test('E2E testing buy Item',async ({page})=>
{
    const textToCart = "iphone 13 pro";
    const countryCode = 'Ind';
    const countryName = "Indonesia";
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(textToCart);
    await dashboardPage.navigateCart();
    
    const cartPage = poManager.getCartPage();
    await cartPage.checkAddItem(textToCart);
    await cartPage.btnToCheckout();

    const orderReview = poManager.getOrderReview();
    await orderReview.chooseCountry(countryCode,countryName);
    await orderReview.verifyEmailUserId(username);
    const OrderId = await orderReview.submitAndGetOrderId();
    console.log(OrderId);

    await dashboardPage.navigateOrders();
    const reviewPage = poManager.getHistoryPage();
    await reviewPage.SelectOrderId(OrderId);
    
    await reviewPage.getOrderId();
    expect(OrderId.includes(await reviewPage.getOrderId())).toBeTruthy();
});


