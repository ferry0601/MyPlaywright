const {test, expect} = require('@playwright/test');

test.beforeEach('test login',async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    
    const userName = page.getByPlaceholder("email@example.com");
    const passWord = page.getByPlaceholder("enter your passsword");
    const btnLogin = page.getByRole("button",{name:"Login"});

    // await page.waitForLoadState("networkidle");
    await userName.fill("waferr@gmail.com");
    await passWord.fill("Iamking@000");
    await btnLogin.click();
    await expect(page.getByText("Login Successfully")).toBeVisible();
    
});

test('E2E testing buy Item',async ({page})=>
{
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    // const titles = await page.locator(".card-body b").allTextContents();
    // console.log(titles);
    const textToCart = "iphone 13 pro";
    const products = await page.locator(".card-body").filter({hasText:textToCart})
    .getByRole("button",{name:"Add to Cart"}).click();
    
    
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("IPHONE 13 PRO")).toBeVisible();

    await page.getByRole("button",{name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("Ind",{delay:100});
    
    await page.getByRole("button",{name:"Indonesia"}).click();
    await expect(page.getByText("waferr@gmail.com").last()).toBeVisible();

    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(await orderId);
    const cleanOrderId = orderId.replace(/\|/g, '').trim();

    await page.getByRole("button",{name:"ORDERS"}).click();
    await page.locator("tbody").first().waitFor();
    
    await page.locator("tbody tr").filter({hasText:cleanOrderId}).getByRole("button",{name:"View"}).click();

    await page.locator(".col-text").waitFor();
    const orderIdDetails = await page.locator(".col-text").textContent();
    await expect(orderId.includes(orderIdDetails)).toBeTruthy();
});


