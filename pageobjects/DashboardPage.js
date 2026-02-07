class DashboardPage{
    constructor(page){
        this.allTitleProducts = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        this.cart = page.locator("[routerlink*='cart']");
        this.page = page;
        this.btnMyOrder = page.locator("button[routerlink*='myorders']");
    }

    async searchProductAddCart(productaName){
        await this.page.waitForLoadState("networkidle"); 
        const titles = await this.allTitleProducts.allTextContents();
        console.log(titles);
        const total = await this.products.count();
        
            for(let i=0;i<total;++i){
                const ambilText = await this.products.nth(i).locator("b").textContent();
                if(ambilText?.trim() === productaName){
                    console.log(ambilText);
                    await this.products.nth(i).locator("text=Add To Cart").click();
                    break;
                }
            }
    }

    async navigateCart(){
        await this.cart.click();
    }
    
    async navigateOrders(){
        await this.btnMyOrder.click();
    }
}

module.exports = {DashboardPage};