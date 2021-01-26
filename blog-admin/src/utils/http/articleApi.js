import request from './http'
export default class ArticleApi {
    constructor() {
        this.config = {
            article_add: '/article/add',
            article_list: '/article/list',
            article_detail: '/article/detail',
            article_edit: '/article/edit',
            article_del: '/article/del'
        }
    }

    articleAdd(params) {
        return request.post(this.config.article_add, params)
    }

    articleList(params) {
        return request.get(this.config.article_list, params)
    }

    articleDetail(id) {
        return request.get(`${this.config.article_detail}/${id}`)
    }

    articleEdit(id,data) {
        return request.put(`${this.config.article_edit}/${id}`,data)
    }

    articleDel(id) {
        return request.delete(`${this.config.article_del}/${id}`)
    }



}