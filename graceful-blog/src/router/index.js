import { createRouter, createWebHistory } from 'vue-router'
import {menuList} from '@/data/MenuList'
const routes=menuList.map(item=>{
  return {
    path: item.path,
    name: item.name,
    component: () => import(/* webpackChunkName: "blog" */ `../views/${item.name}.vue`)
  }
})
routes.unshift({
        path: '/',
        redirect: '/home'
})
// const routes = [
//   {
//     path: '/',
//     redirect: '/home'
//   },
//   {
//     path: '/home',
//     name: 'home',
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
//   },
//   {
//     path: '/article',
//     name: 'article',
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue')
//   },
//   {
//     path: '/demo',
//     name: 'demo',
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/Demo.vue')
//   },
//   {
//     path: '/github',
//     name: 'github',
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/Github.vue')
//   },
//   {
//     path: '/messageboard',
//     name: 'messageboard',
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/MessageBoard.vue')
//   },
//   {
//     path: '/phtots',
//     name: 'photos',
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/Photos.vue')
//   },
//   {
//     path: '/profile',
//     name: 'profile',
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
//   },
  
// ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  // console.log(to);
  // console.log(from);
  // console.log(next);
  if(to.path==='/login'){
    next()
  }else{
    let AUTH_TOKEN=localStorage.getItem('auth_token')
    AUTH_TOKEN? (next()) : (router.push('/login'))
  }
 
})

export default router
