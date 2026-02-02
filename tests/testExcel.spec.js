const ExcelJs = require("exceljs");
const {test, expect} = require('@playwright/test');

async function writeExcelTest(searchText,replaceText, change, filePath)
{
   
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1'); 
    const output = await readExcelTest(worksheet,searchText);
    
    const cell = worksheet.getCell(output.row+change.rowChange,output.coloumn+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}

async function readExcelTest(worksheet, searchText) 
{
    let output = {row:-1,coloumn:-1}
    worksheet.eachRow((row, rowNumber)=>
    {
        row.eachCell((cell, colNumber)=>
        {
            if(cell.value === searchText){
                output.row = rowNumber;
                output.coloumn = colNumber;
            }
        })
    })
    return output;

}

test('testing upload excel',async({page})=>
{
    const filePath = "C:/Users/wahyu/Downloads/download.xlsx";
    const textSearch = "Apple";
    const updateValue = '350';
    const cellPosition = {rowChange:0,colChange:2};

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const promiseDownload = page.waitForEvent("download");
    await page.getByRole("button",{name:"Download"}).click();
    const download = await promiseDownload;
    //const tempDownload = await download.path();
    await download.saveAs(filePath);

    await writeExcelTest(textSearch,updateValue,cellPosition,filePath);
    await page.getByRole("button",{name:"Choose File"}).click();
    await page.getByRole("button",{name:"Choose File"}).setInputFiles(filePath);
    const textLocator = await page.getByText(textSearch);
    const rowLocator = await page.getByRole("row").filter({has:textLocator});
    await expect(rowLocator.locator("#cell-4-undefined")).toContainText(updateValue);

});