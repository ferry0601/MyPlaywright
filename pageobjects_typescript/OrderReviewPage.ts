import {expect} from '@playwright/test';
import {Page} from '@playwright/test';
import {Locator} from '@playwright/test';

export class OrderReviewPage{

    page:Page;
    typeCountry:Locator;
    btnDropdown:Locator;
    mailUserName:Locator;
    btnSubmit:Locator;
    titleSuccess:Locator;
    orderIdText:Locator;

    constructor(page:Page){
        this.page = page;
        this.typeCountry = page.locator("[placeholder*='Select Country']");
        this.btnDropdown = page.locator(".ta-results");
        this.mailUserName = page.locator(".user__name [type='text']");
        this.btnSubmit = page.locator(".action__submit");
        this.titleSuccess = page.locator(".hero-primary");
        this.orderIdText = page.locator(".em-spacer-1 .ng-star-inserted");


    }

    async chooseCountry(countryCode:string,countryName:string){
        await this.typeCountry.pressSequentially(countryCode,{delay:100});
        await this.btnDropdown.waitFor();
        const countBtnDropdown = await this.btnDropdown.locator("button").count();

        for(let i=0;i<countBtnDropdown;++i){
            let text:any;
            text = await this.btnDropdown.locator("button").nth(i).textContent();
            if(text.includes(countryName)){
                await this.btnDropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async verifyEmailUserId(username:string){
        await expect(this.mailUserName.first()).toHaveText(username);
    }
    
    async submitAndGetOrderId(){
        await this.btnSubmit.click();
        await expect(this.titleSuccess).toHaveText(" Thankyou for the order. ");
        return await this.orderIdText.textContent();
    }
}

module.exports = {OrderReviewPage};