import request from './http'
export default class ArticleApi{
    constructor(){
        this.config={
            getArticleList: '/article/list',
            getArticleDetail: '/article/detail/',
            upvoteArticle: '/article/upvote',
            visitsArticle: '/article/visits/',
        }
    }

    getArticleList(params){
        return request.get(this.config.getArticleList,params)
    }

    getArticleDetail(id){
        return request.get(this.config.getArticleDetail+id)
    }

    upvoteArticle(params){
        return request.put(this.config.upvoteArticle,params)
    }

    visitsArticle(id){
        return request.put(this.config.visitsArticle+id)
    }
}