const {test, expect} = require('@playwright/test');

let webContext;
let page;

test.beforeAll(async ({browser}) => {
  webContext = await browser.newContext();
  page = await webContext.newPage();
});

test('login and fetch element', async () => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator('#userEmail').fill("hknavaneeth@gmail.com");
  await page.locator('#userPassword').fill("Nithu@12345");
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle');
  await page.context().storageState({path: 'state.json'});

  const email = await page.locator(".user__name [type='text']").first().textContent();
  expect(email).toHaveText("hknavaneeth@gmail.com");
});

test('place order', async () => {
  const email = "hknavaneeth@gmail.com";
  const productName = 'Zara Coat 4';
  
  await page.goto("https://rahulshettyacademy.com/client");
  
  await page.locator('.card-body b').first().waitFor();
  const alltitles = await page.locator('.card-body b').allTextContents();
  console.log(alltitles);

 
  const products = page.locator(".card-body");
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if (await products.nth(i).locator("b").textContent() === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  await page.locator("h3:has-text('Zara coat 4')").isVisible();

  await page.locator("text=CheckOut").click();

  await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay: 150});
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});