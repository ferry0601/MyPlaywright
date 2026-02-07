class APiUtils {

    constructor(apiContex,payloadLogin){
        this.apiContext = apiContex;
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

    async createOrder(payloadOrder){
        // create order
        let response = {};
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