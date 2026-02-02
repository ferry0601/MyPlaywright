const {test, expect} = require("@playwright/test");
const path = require("node:path");

test('test validation hidden', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com/");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.getByRole("button",{name: "Hide"}).click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    
    page.on("dialog",dialog=>dialog.accept()); //accept or dismiss
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.getByRole("listitem").getByRole("link",{name:"All Access Plan"}).click();
    await expect(framePage.getByText("Join 13,522 Happy Subscibers!")).toBeVisible();
    const takeTotalSubs = await framePage.locator(".text h2").textContent();
    console.log(takeTotalSubs.split(" ")[1]);
});


test('test screenshot',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialimage.png'});
    await page.getByRole("button",{name: "Hide"}).click();
    await page.screenshot({path:'ss.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test.only('test match gambar',async({page})=>
{
    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot("landingPage.png",{
    maxDiffPixelRatio: 0.02}); //toleransi 2%
});