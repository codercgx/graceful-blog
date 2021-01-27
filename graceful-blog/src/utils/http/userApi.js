import request from './http'
export default class UserApi{
    constructor(){
        this.config={
            userLogin: '/user/login',
            userRegister: '/user/register',
            sendEmailCode: '/user/emailInfo',
            getUserInfo: '/user/profile/',
            uploadAvatar: '/upload/pic/avatar',
            aditUserInfo: '/user/edit/'
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

    getUserInfo(params){
        return request.get(this.config.getUserInfo+params)
    }

    uploadAvatar(params,config){
        return request.post(this.config.uploadAvatar,params,config)
    }

    editUserInfo(id,params){
        return request.put(this.config.aditUserInfo+id, params)
    }

}