const {test,expect} = require ("@playwright/test");

test('testing calender',async ({page})=>
{
    const date = "12";
    const month = "1";
    const year = "2030";
    const expectedList = [date,month,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    await page.getByText(year).nth(1).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    const inputsDate = await page.locator("react-date-picker__inputGroup__input");
    for(let i=0;i>expectedList.length;i++){
        const value = await inputsDate.nth(i).inputValue();
        expect(value).toEqual(expectedList[i])
    }
});