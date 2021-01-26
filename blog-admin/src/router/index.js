import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
  
    component: () => import(/* webpackChunkName: "home" */ '@/views/Index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
    
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue')
      },
      {
        path: '/article/add',
        name: 'Article_Add',
        component: () => import(/* webpackChunkName: "article" */ '@/views/ArticleManage/Article_Add.vue')
      },
      {
        path: '/article/list',
        name: 'Article_List',
       
        component: () => import(/* webpackChunkName: "article" */ '@/views/ArticleManage/Article_List.vue')
      },
      {
        path: '/article/edit/:id',
        name: 'Article_Edit',
        props: true,
        component: () => import(/* webpackChunkName: "article" */ '@/views/ArticleManage/Article_Add.vue')
      },
      {
        path: '/upload/album',
        name: 'Album',
        component: () => import(/* webpackChunkName: "article" */ '@/views/UploadManage/AlbumManage.vue')
      },
      {
        path:'/upload/demo',
        name: 'Demo',
        component: () => import(/* webpackChunkName: "article" */ '@/views/UploadManage/DemoManage.vue')
      },

    ]
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
