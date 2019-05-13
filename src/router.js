import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Carousel from '@/components/Carousel'
import User from '@/views/User'
import Login from '@/views/user/Login'
import Reg from '@/views/user/Reg'
import Product from '@/views/Product'
import Detail from '@/views/Detail'
import Shoppingcar from '@/views/Shoppingcar'
import AdminLogin from '@/admin/AdminLogin'
import AdminIndex from '@/admin/AdminIndex'
import ProductAdd from '@/admin/child/ProductAdd'
import ProductDelete  from '@/admin/child/ProductDelete'
import ProductUpdate from '@/admin/child/ProductUpdate'
import ProductList from '@/admin/child/ProductList'
import UserDetail from '@/admin/child/UserDetail'
import UserList from '@/admin/child/UserList'


Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Index,
      children:[
        { path: '', component: Index},
        { path: '/index', component: Index},
        { path: 'carousel', component: Carousel},
      ]
    },
    { path: '/user', name: 'user', component: User,
      children:[
        { path: 'login', name:'login', component: Login},
        { path: 'reg', component: Reg}
      ]
    },
    { path: '/product/:kind', name: 'product', component: Product},
    { path: '/detail/:lid/:kind', name: 'detail', component: Detail},
    { path: '/shoppingcar', name: 'shoppingcar', component: Shoppingcar, meta:{ auth: true}},
    { path: '/adminLogin', component: AdminLogin},
    { path: '/adminIndex', component: AdminIndex, 
      children:[
        { path: 'productadd', component: ProductAdd},
        { path: 'productdelete', component: ProductDelete},
        { path: 'productupdate', component: ProductUpdate},
        { path: 'productlist', component: ProductList},
        { path: 'userdetail', component: UserDetail},
        { path: 'userlist', component: UserList},
      ]
    }
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
        name:'login',
      });
    }
  }else{
    next();
  }
})

export default router;
