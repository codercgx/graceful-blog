import axios from "axios";
import { getCurrentInstance } from "vue";
const ctx = getCurrentInstance()
const request = axios.create({ baseURL: "http://localhost:3000" });

request.defaults.timeout = 60000;
request.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const auth_token=localStorage.getItem('auth_token')
    auth_token&& (config.headers.Authorization = 'Bearer ' + auth_token )
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request
    .interceptors
    .response
    .use(function (response) {
        // 对响应数据做点什么
        if (response.data.code == 0) {
            return response.data.data;
        } else {
            //  ctx.$message({
            //         showClose: true,
            //         message: "code:" + response.data.code + ",mag:" + response.data.error,
            //         duration: 3000,
            //         type: "error"
            //     });
            return Promise.reject({
                code: response.data.code,
                message: response.data.message
            });
        }
    }, function (err) {
        // 对响应错误做点什么
        switch (err.response.status) {
            case 400:
                err.message = "请求错误"
                break
            case 401:
                err.message = "未授权，请登录"
                break
            case 403:
                err.message = "拒绝访问"
                break
            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`
                break
            case 408:
                err.message = "请求超时"
                break
            case 500:
                err.message = "服务器内部错误"
                break
            case 501:
                err.message = "服务未实现"
                break
            case 502:
                err.message = "网关错误"
                break
            case 503:
                err.message = "服务不可用"
                break
            case 504:
                err.message = "网关超时"
                break
            case 505:
                err.message = "HTTP版本不受支持"
                break
            default:
        }
        //     ctx.$message({
        //     showClose: true,
        //     message: "code:" + err.response.status + ",mag:" + err.message,
        //     duration: 3000,
        //     type: "error"
        // });
        return Promise.reject(err);
    });



    let header = function(){
        let app_token = localStorage.getItem('auth_token');
        let timestamp = new Date().getTime();
        if (!app_token) {
          return {
            'Content-Type': 'application/json'
          }
        } else {
          app_token = app_token || '';
          let strSign = 'token=' + app_token + '&timestamp=' + timestamp;
          let sign = Md5.hex_md5(strSign).toUpperCase();
          return {
            'Content-Type': 'application/json',
            'token': app_token,
            'timestamp': timestamp,
            'sign': sign
          };
        }
      }

export default request;
