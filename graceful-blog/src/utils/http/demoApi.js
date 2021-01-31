import request from '@/utils/http/http'
export default class DemoApi{
    constructor(){
        this.config={
            getDemoList: '/demo/list',
            getDemoDetail: '/demo/detail/'
        }
    }

    getDemoList(){
        return request.get(this.config.getDemoList)
    }

    getDemoDetail(id){
        return request.get(this.config.getDemoDetail+id)
    }
}