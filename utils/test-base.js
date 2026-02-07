const base = require('@playwright/test');


exports.customtest = base.test.extend(
{
    testDataforOrder :{
        username : "waferr@gmail.com",
        password : "Iamking@000",
        messageSuccess : " Login Successfully ",
        textToCart: "iphone 13 pro",
        countryCode : "Ind",
        countryName : "Indonesia"
    }
})