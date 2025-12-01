const {test,expect}= require ('@playwright/test');



test('login and fetch element', async ({page})=>{


await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

await page.locator('#userEmail').fill("hknavaneeth@gmail.com");
await page.locator('#userPassword').fill('Nithu@12345');
await page.locator('#login').click();

// console.log(await page.locator('.card-body b').first().textContent());
//await page.waitForLoadState('networkidle');
// Discourage, if this does not work await page.waitForLoadState('networkidle');, use below one
await page.locator('.card-body b').first().waitFor();
const alltitles= await page.locator('.card-body b').allTextContents();
console.log(alltitles);
});

test('basic functions', async({page})=>
{
    page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropdown= page.locator('select.form-control');
    const documentLink = page.locator('[href*="documents-request"]');
    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await expect (page.locator('.radiotextsty').last()).toBeChecked();

    await page.locator("#terms").click();
    await expect (page.locator('#terms')).toBeChecked();

    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    
    await expect(documentLink).toHaveAttribute('class','blinkingText');

});

test('window handle', async ({browser}) =>
{

    const context= await browser.newContext();
    const page = await context.newPage();
    const username= page.locator('#userName');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator('[href*="documents-request"]');
    
    const [newpage]= await Promise.all(
        [ 
           context.waitForEvent('page'),
           documentLink.click()
   ] )

   const text=await newpage.locator(".red").textContent();
   const arraytest= text.split("@")[0]
   const domain = arraytest[1].split(" ")[0]
   console.log(domain);
   await page.locator('#username').fill(domain);
   console.log(await page.locator("#username").inputValue());

});