import {type Page,type Locator, expect} from '@playwright/test';


let message2 : string = "hai";
let age2 : number = 25;
let numbering2 : number[]= [1,2,3];
let apapun1 : any = "apa aja";
apapun1 = 21;

console.log(message2,age2,numbering2, apapun1);

function add (a:number,b:number){
    return a+b;
}

let data: {name:string, age:number} = {name:"ferry",age:21};
data.name = "aku";

class CartPage{
    page:Page;
    btncheckout:Locator;
    cardProduct:Locator;
    constructor(page:any){
        this.page = page;
        this.btncheckout = page.locator("text=Checkout");;
        this.cardProduct = page.locator("div li")
    }
}