const base =require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrders : {
    username:"hknavaneeth@gmail.com",
    password:"Nithu@12345",
    productName:"Zara Coat 4"
    }
})