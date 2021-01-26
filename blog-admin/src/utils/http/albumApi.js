import request from './http'
export default class AlbumApi {
    constructor() {
        this.config = {
            album_add: '/album/add',

        }
    }

    albumAdd(params, config) {
        return request.post(this.config.album_add, params, config)
    }



}