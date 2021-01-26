import request from './http'
export default class AlbumApi{
    constructor(){
        this.config={
            albumList: '/album/list',
  
        }
    }

    albumList(params){
        return request.get(this.config.albumList,params)
    }

}