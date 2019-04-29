import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Carousel from '@/components/Carousel'
import Loginreg from '@/views/Loginreg'
import Product from '@/views/Product'
import Detail from '@/views/Detail'
import Shoppingcar from '@/views/Shoppingcar'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Index,
      children:[
        { path: '', component: Index},
        { path: '/index', component: Index},
        { path: '/carousel', component: Carousel},
      ]
    },
    { path: '/loginreg/:lid/:kind', name: 'login', component: Loginreg},
    { path: '/product/:kind', name: 'classify', component: Product},
    { path: '/detail/:lid/:kind', name: 'laptop_lid', component: Detail},
    { path: '/shoppingcar/:lid/:count', name: 'product_lid', component: Shoppingcar, meta:{ auth: true}},
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if(to.meta.auth){
    if(localStorage.getItem('uname')){ 
      // 不为空 放行
      next();
    }else{
      // 用户需要登录
      next({
        name:'login'
      });
    }
  }else{
    next();
  }
})

export default router;
