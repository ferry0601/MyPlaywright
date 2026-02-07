const {expect} = require('@playwright/test');

class CartPage{
    constructor(page){
        this.page = page;
        this.btncheckout = page.locator("text=Checkout");;
        this.cardProduct = page.locator("div li")
    }


    async checkAddItem(productName){
        await this.cardProduct.first().waitFor();
        const adaAddItem = await this.getTextLocator(productName).isVisible();
        expect(adaAddItem).toBeTruthy();
    }

    getTextLocator(productName){
        return this.page.locator("h3:has-text('"+productName+"')");
    }

    async btnToCheckout(){
        await this.btncheckout.click();
    }
}

module.exports = {CartPage};