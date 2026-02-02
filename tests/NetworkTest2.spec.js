const {test, expect} = require("@playwright/test");

test('@QW security network test',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/");
        
        const userName = page.locator("#userEmail");
        const passWord = page.locator("#userPassword");
        const btnLogin = page.locator("[value = 'Login']");
    
        // await page.waitForLoadState("networkidle");
        await userName.fill("waferr@gmail.com");
        await passWord.fill("Iamking@000");
        await btnLogin.click();
        await page.waitForLoadState("networkidle");
        await page.locator(".card-body b").first().waitFor();

        await page.locator("button[routerlink*='myorders']").click();
        await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
            route=> route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"}))
        await page.locator("button:has-text('View')").first().click();
        await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})