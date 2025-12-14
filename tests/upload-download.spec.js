const ExcelJs=require('exceljs');
const {test,expect}=require('@playwright/test');


async function writeExcelTest(searchText, replaceText,change, filepath) {
    
    const workbook= new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filepath);
    const worksheet= workbook.getWorksheet('Sheet1');
    const output=await readExcel(worksheet,searchText);
    const cell =worksheet.getCell(output.row, output.column+change.colChange);
    cell.value=replaceText;
    await workbook.xlsx.writeFile(filepath);
}
    async function readExcel(worksheet,searchText) {
        let output={row:-1,column:-1}
    worksheet.eachRow((row, rowNumber) =>
    {
        row.eachCell((cell, colNumber) =>
        {
            if(cell.value===searchText)
                {
                output.row=rowNumber;
                output.column=colNumber;
            }
        });
    });
    return output;

    
                
}
 


//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"C:/Users/Navaneeth H K/Downloads/exceldownloadTest.xlsx");

test('dowmload and upload',async({page}) =>
{
    const textSearch = 'Mango';
  const updateValue = '350'
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const dowmloadPromise= page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    await dowmloadPromise;


    writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"C:/Users/Navaneeth H K/Downloads/download.xlsx");

    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:/Users/Navaneeth H K/Downloads/download.xlsx");
const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);


});

