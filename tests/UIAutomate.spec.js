const {test,expect}= require ('@playwright/test');

test('Page playwright', async({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://www.facebook.com");
    console.log(page.title());
    await expect(page).toHaveTitle("Facebook – log in or sign up");
    await page.locator('input#email').fill("hknavaneeth");
    await page.locator("[type='password']").fill("nithu");
    await page.locator("[name='login']").click();
    await expect(page.locator('div._9ay7')).toContainText("The email address or mobile number you entered isn't connected to an account. Find your account and log in.");
});

test('loginneative and positive',async ({browser}) =>
{
const context = await browser.newContext();
const page= await context.newPage();
const username= page.locator('#username');
const password = page.locator('#password');
const btn = page.locator('#signInBtn');
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await username.fill("nithu");
await password.fill("learning");
await btn.click();
console.log(await page.locator("[Style*='block']").textContent());
await expect(page.locator("[Style*='block']")).toContainText("Incorrect");

await username.fill("");
await username.fill("rahulshettyacademy");
await btn.click();
console.log(await page.locator("[class='card h-100'] .card-title").first().textContent());
console.log(await page.locator("[class='card h-100'] .card-title").nth(1).textContent());
});

test('login and registration',async ({browser}) =>{

const context = await browser.newContext();
const page= await context.newPage();


await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator('.text-reset').click();

await page.locator('#firstName').fill("Navaneeth");
await page.locator('#lastName').fill("H K");
await page.locator('#userEmail').fill("hknavaneeth@gmail.com");
await page.locator('#userMobile').fill("8105663362");
await page.locator('[value="Male"]').click();
await page.locator('#userPassword').fill('Nithu@12345');
await page.locator('#confirmPassword').fill("Nithu@12345");
await page.locator('[type="checkbox"]').click();

await page.locator('#login').click();

await page.locator('[class="btn btn-primary"]').click();
await page.locator('#userEmail').fill("hknavaneeth@gmail.com");
await page.locator('#userPassword').fill('nithu@12345');
await page.locator('#login').click();
});

test('login and fetch element', async ({browser})=>{
const context =await browser.newContext();
const page = await context.newPage();

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

await page.locator('#userEmail').fill("hknavaneeth@gmail.com");
await page.locator('#userPassword').fill('Nithu@12345');
await page.locator('#login').click();

console.log(await page.locator('.card-body b').first().textContent());

const alltitles= await page.locator('.card-body b').allTextContents();
console.log(alltitles);
});