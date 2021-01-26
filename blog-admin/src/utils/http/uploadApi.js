import request from './http'
export default class UploadApi {
    constructor() {
        this.config = {
            uploadCover: '/upload/pic/article',
            uploadAlbum: '/upload/pic/album',
            uploadDemo: '/upload/pic/demo'

        }
    }

    uploadArticleCover(params, config) {
        return request.post(this.config.uploadCover, params, config)
    }

    uploadAlbum(params, config) {
        return request.post(this.config.uploadAlbum, params, config)
    }

    uploadDemo(params, config) {
        return request.post(this.config.uploadDemo, params, config)
    }



}