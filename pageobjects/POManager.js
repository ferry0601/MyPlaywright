const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {OrderReviewPage} = require('./OrderReviewPage');
const { ReviewHistoryPage } = require('./ReviewHistoryPage');

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderReview = new OrderReviewPage(this.page);
        this.historyPage = new ReviewHistoryPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }
    
    getOrderReview(){
        return this.orderReview;
    }

    getHistoryPage(){
        return this.historyPage;
    }
}

module.exports = {POManager};