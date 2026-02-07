class ReviewHistoryPage{
    constructor(page){
        this.page = page;
        this.tableOrder = page.locator("tbody").first();
        this.rowTable = page.locator("tbody tr");
        this.orderDetails = page.locator(".col-text");
    }

    async SelectOrderId(orderId){
        await this.tableOrder.waitFor();

        for(let i=0;i<await this.rowTable.count();++i){
            const rowsOrderId = await this.rowTable.nth(i).locator("th").textContent();
            if(orderId.includes(rowsOrderId)){
                await this.rowTable.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async getOrderId(){
        await this.orderDetails.waitFor();
        return await this.orderDetails.textContent();
    }


}

module.exports = {ReviewHistoryPage};