const {test,expect}=require('@playwright/test')

test.only('more functionalities',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com/");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect (page.locator('#displayed-text')).toBeHidden();

    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();

    await page.locator('#mousehover').hover();
    page.pause();

    const framepage= page.frameLocator('#courses-iframe');
    await framepage.locator("div a[href*='all-access-subscription']").first().click();
    const users= await framepage.locator('div .text-2xl').nth(1).textContent();
    console.log(users);
});