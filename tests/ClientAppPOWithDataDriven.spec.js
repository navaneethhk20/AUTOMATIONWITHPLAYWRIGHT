 const {test, expect} = require('@playwright/test');
 const {POManager} = require('../pageObjectModel/POManager');
const dataset=JSON.parse(JSON.stringify(require('../utils/productsTestData.json')));

for(const data of dataset ){
 test(`Client App login ${data.productName}`, async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    //  const username = "hknavaneeth@gmail.com";
    //  const password = "Nithu@12345"
    //  const productName = 'Zara Coat 4';
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(data.username,data.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(data.productName);
  //    await dashboardPage.navigateToCart();

  //   const cartPage = poManager.getCartPage();
  //   await cartPage.VerifyProductIsDisplayed(data.productName);
  //   await cartPage.Checkout();

  //   const ordersReviewPage = poManager.getOrdersReviewPage();
  //   await ordersReviewPage.searchCountryAndSelect("ind","India");
  //   const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  //  console.log(orderId);
  //  await dashboardPage.navigateToOrders();
  //  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  //  await ordersHistoryPage.searchOrderAndSelect(orderId);
  //  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


 });
 

}
