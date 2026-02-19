const { Before,After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const {POManager} = require('../../pageobjects/POManager');
const {chromium} = require('@playwright/test');

Before(async function(){
    this.browser = await chromium.launch({headless: false}); 
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();    
    this.poManager = new POManager(this.page);
});

BeforeStep(function(){

});

AfterStep(async function({result}){
    if(result?.status === Status.FAILED){
        const screenshotName = `failed-${Date.now()}.png`;
        await this.page.screenshot({ path: screenshotName });
        console.log("Screenshot saved:", screenshotName);
    }
});



After(async function(){
    await this.browser.close();
    console.log("I'm last executed");
});