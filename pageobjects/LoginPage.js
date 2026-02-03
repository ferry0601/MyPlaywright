class LoginPage{
    
    constructor(page){
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.passWord = page.locator("#userPassword");
        this.btnLogin = page.locator("[value = 'Login']");
        this.loginMessage = page.locator(".toast-title");
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
    async validLogin(username,password){
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.btnLogin.click();
        
    }
    getLoginMessage(){
        return this.loginMessage;
    }
}

module.exports = {LoginPage};