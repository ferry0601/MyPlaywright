import { expect } from "@playwright/test";
import {Page} from '@playwright/test';
import {Locator} from '@playwright/test';

export class CartPage{

    page:Page;
    btncheckout:Locator;
    cardProduct:Locator;

    constructor(page:Page){
        this.page = page;
        this.btncheckout = page.locator("text=Checkout");;
        this.cardProduct = page.locator("div li")
    }


    async checkAddItem(productName:string){
        await this.cardProduct.first().waitFor();
        const adaAddItem = await this.getTextLocator(productName).isVisible();
        expect(adaAddItem).toBeTruthy();
    }

    getTextLocator(productName:string){
        return this.page.locator("h3:has-text('"+productName+"')");
    }

    async btnToCheckout(){
        await this.btncheckout.click();
    }
}

