class APiUtils{

    constructor(apiContext,loginPayLoad){
        this.apiContext=apiContext;
        this.loginPayLoad=loginPayLoad;
    }

    async getToken(){
         const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                {
                    data:this.loginPayLoad
                }
            );
        
          
        
            const loginResponsejson=await loginResponse.json();
            
            const token=loginResponsejson.token;
            console.log(token);
            return token;
    }

    async createOrder(orderPayLoad){
        let response={};
        response.token=await this.getToken();
         const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                   data: orderPayLoad,
                   headers: {
                    'Authorization': response.token,
                   
                   'Content-type': 'application/json'
                   },
                }
            );
      
        
            const orderResponsejson= await orderResponse.json();
           const orderId=orderResponsejson.orders[0];
            console.log(orderId);
           response.orderId= orderId;
            return response;
    }

}

module.exports={APiUtils};