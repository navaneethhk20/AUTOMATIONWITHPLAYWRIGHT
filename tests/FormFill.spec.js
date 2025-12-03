const { test,expect } = require('@playwright/test');

test('form fill and submit', async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByPlaceholder("Password").fill("123");
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByRole("button",{name:"Submit"}).click();
    await page.getByText(" The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).click();

});

test('calendar',async ({page})=>
{
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
 
    const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }
 
   
 
});