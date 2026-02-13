import {test as baseTest} from '@playwright/test';
interface testDataforOrder{
     username :string,
        password : string,
        messageSuccess : string,
        textToCart: string,
        countryCode : string,
        countryName : string
};

export const customtest = baseTest.extend<{testDataforOrder:testDataforOrder}>(
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