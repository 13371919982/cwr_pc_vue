import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Index from '@/views/Index'
import User from '@/views/User'
import Login from '@/views/user/Login'
import Reg from '@/views/user/Reg'
import Product from '@/views/Product'
import Detail from '@/views/Detail'
import Shoppingcart from '@/views/Shoppingcart'
import Order from '@/views/Order'
import Usercenter from '@/views/Usercenter'
import Myorder from '@/views/usercenter/Myorder'
import Orderall from '@/views/usercenter/orderstates/Orderall'
import Orderspay from '@/views/usercenter/orderstates/Orderspay'
import Orderhandle from '@/views/usercenter/orderstates/Orderhandle'
import Orderdone from '@/views/usercenter/orderstates/Orderdone'
import Mycollection from '@/views/usercenter/Mycollection'
import Myscore from '@/views/usercenter/Myscore'
import Myticket from '@/views/usercenter/Myticket'
import Myinfo from '@/views/usercenter/Myinfo'
import NotFound from '@/views/NotFound'
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
      ]
    },
    { path: '/user', name: 'user', component: User,
      children:[
        { path: 'login', name: 'login', component: Login},
        { path: 'reg', name: 'reg', component: Reg}
      ]
    },
    { path: '/product', name:'product', component: Product, props:true,
      children:[
        { path: 'kwords/:kind', name:'kwords'},
        { path: 'head/:kind', name:'head'},
        { path: 'rank/:kind', name:'rank'},
        { path: 'sex/:kind', name:'sex'},
        { path: 'size/:kind', name:'size'},
        { path: 'brand/:kind', name:'brand'},
        { path: 'color/:kind', name:'color'},
      ]
    },
    { path: '/detail/:lid', name:'detail', component: Detail, props: true},
    { path: '/shoppingcart', name: 'shoppingcart', component: Shoppingcart, meta:{ auth: true}},
    { path: '/order', name: 'order', component: Order},
    { path: '/usercenter', name: 'usercenter', component: Usercenter,
      children: [
        { path: 'myorder', name: 'myorder', component: Myorder,
          children: [
            { path: 'orderall', name: 'orderall', component: Orderall},
            { path: 'orderspay', name: 'orderspay', component: Orderspay},
            { path: 'orderhandle', name: 'orderhandle', component: Orderhandle},
            { path: 'orderdone', name: 'orderdone', component: Orderdone},
          ]
        },
        { path: 'mycollection', name: 'mycollection', component: Mycollection},
        { path: 'myscore', name: 'myscore', component: Myscore},
        { path: 'myticket', name: 'myticket', component: Myticket},
        { path: 'myinfo', name: 'myinfo', component: Myinfo},
      ]
    },
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
    },
    { path: '*', component: NotFound}
  ]
})

// 页面刷新时，重新赋值token
if(sessionStorage.getItem('token')){
  store.commit('addUser',sessionStorage.getItem('token'));
}

// 路由守卫
router.beforeEach((to, from, next) => {
  if(to.meta.auth){ // 判断该路由是否需要登录权限
    if(store.state.token){ // 通过vuex state获取当前的token是否存在
      // 不为空 放行
      next();
    }else{
      // 用户需要登录
      next('/user/login');
    }
  }else{
    next();
  }
})

export default router;
