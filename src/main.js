import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '../node_modules/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Carousel,Icon} from 'element-ui';
import SlideVerify from 'vue-monoplasty-slide-verify';
  
Vue.prototype.axios=axios;
axios.defaults.withCredentials=true;
axios.defaults.baseURL='http://127.0.0.1:3000';
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Carousel);
Vue.use(Icon);
Vue.use(SlideVerify);

// money过滤 前导人民币符号￥
Vue.filter('money',(val)=>{
  return val=`￥${val}`;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
