const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');

const payloadLogin = {userEmail: "waferr@gmail.com", userPassword: "Iamking@000"};
const payloadOrder = {orders: [{country: "Singapore", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};
const fakePayloadOrders = {data:[],message:"No Orders"}

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
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill({
                response,
                body,
            })
            //intercept response-API response-playwright response-browser
        }
    )
    
});

test('@API E2E testing buy Item',async ({page})=>
{
    await page.getByRole("button",{name:"ORDERS"}).click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    
});


