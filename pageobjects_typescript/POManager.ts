import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CartPage} from'./CartPage';
import {OrderReviewPage} from './OrderReviewPage';
import { ReviewHistoryPage } from './ReviewHistoryPage';
import {Page} from '@playwright/test';

export class POManager{
    page:Page;
    loginPage:LoginPage;
    dashboardPage:DashboardPage;
    cartPage:CartPage;
    orderReview:OrderReviewPage;
    historyPage:ReviewHistoryPage;

    constructor(page:Page){
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