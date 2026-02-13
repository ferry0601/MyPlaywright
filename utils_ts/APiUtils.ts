class APiUtils {
    apiContext:any;
    payloadLogin:any;

    constructor(apiContext:any,payloadLogin:any){
        this.apiContext = apiContext;
        this.payloadLogin = payloadLogin;
    }

    async getToken(){
    // login
    const responseApiLogin = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: this.payloadLogin
        }
    )//200,201
    const responseJson = await responseApiLogin.json();
    const token = responseJson.token;
    console.log(token);
    return token;
    }

    async createOrder(payloadOrder:string){
        // create order
        let response = {token:String,orderId:String};
        response.token = await this.getToken();
        const responApiOrder = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data: payloadOrder,
                    headers: {
                        'authorization' : response.token,
                        'content-type' : 'application/json'
                    }
                }
            )
            const responseOrderJson = await responApiOrder.json();
            const orderId = responseOrderJson.orders[0];
            response.orderId = orderId;

            return response;

    }
}

module.exports = {APiUtils};