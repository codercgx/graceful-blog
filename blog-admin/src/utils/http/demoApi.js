import request from './http'
export default class DemoApi {
    constructor() {
        this.config = {
            demo_add: '/demo/add',

        }
    }

    demoAdd(params, config) {
        return request.post(this.config.demo_add, params, config)
    }



}