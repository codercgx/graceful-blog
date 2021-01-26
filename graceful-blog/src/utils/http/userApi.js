import request from './http'
export default class BlogApi{
    constructor(){
        this.config={
            userLogin: '/user/login',
            userRegister: '/user/register',
            sendEmailCode: '/user/emailInfo'
        }
    }

    userLogin(params){
        return request.post(this.config.userLogin,params)
    }

    userRegister(params){
        return request.post(this.config.userRegister,params)
    }

    sendEmailCode(params){
        return request.post(this.config.sendEmailCode,params)
    }

}