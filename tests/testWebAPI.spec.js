const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');

const payloadLogin = {userEmail: "waferr@gmail.com", userPassword: "Iamking@000"};
const payloadOrder = {orders: [{country: "Singapore", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};

let response;

test.beforeAll(async ()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,payloadLogin);
    response = await apiUtils.createOrder(payloadOrder)
    
    
});



test.beforeEach('test login',async ({page}) => {
    
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    
});

test('@API E2E testing buy Item',async ({page})=>
{
    await page.getByRole("button",{name:"ORDERS"}).click();
    await page.locator("tbody").first().waitFor();
    
    await page.locator("tbody tr").filter({hasText:response.orderId}).getByRole("button",{name:"View"}).click();

    await page.locator(".col-text").waitFor();
    const orderIdDetails = await page.locator(".col-text").textContent();
    await expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});


