 const {customtest} = require('../utils/test-data');
 const {POManager} = require('../pageObjectModel/POManager');


 customtest('Client App login ', async ({page,testDataForOrders})=>
 {
   const poManager = new POManager(page);
   
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(testDataForOrders.username,testDataForOrders.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(testDataForOrders.productName);

 });
 

