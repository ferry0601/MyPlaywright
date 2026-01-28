const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    
    const userName = page.locator("#userEmail");
    const passWord = page.locator("#userPassword");
    const btnLogin = page.locator("[value = 'Login']");

    // await page.waitForLoadState("networkidle");
    await userName.fill("waferr@gmail.com");
    await passWord.fill("Iamking@000");
    await btnLogin.click();
    const loginMessage = page.locator(".toast-title").textContent();
    console.log(await loginMessage);
    expect(await loginMessage).toContain(" Login Successfully ");
    await page.waitForLoadState("networkidle");
    await context.storageState({path:"state.json"});
    webContext = await browser.newContext({storageState:'state.json'})
    
});

test('E2E testing buy Item',async ({page})=>
{
    
    await page.locator(".card-body b").first().waitFor();
    // const titles = await page.locator(".card-body b").allTextContents();
    // console.log(titles);
    const textToCart = "iphone 13 pro";
    const page = await webContext.newPage();
    const products = page.locator(".card-body");
    
    const total = await products.count();

    for(let i=0;i<total;++i){
        const ambilText = await products.nth(i).locator("b").textContent();
        if(ambilText?.trim() === textToCart){
            console.log(ambilText);
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    
    await page.locator("[routerlink*='cart']").click();
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
    await expect(page.locator(".user__name [type='text']").first()).toHaveText("waferr@gmail.com");
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


