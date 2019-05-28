import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 1.存储数据
  state: {
    token:'',
    count:0
  },
  
  // 2.取数据
  getters: {
    getCount(state){
      return state.count;
    }
  },

  // 3.操作数据 只能是同步操作 丢失快照记录
  mutations: {
    // 用户登录 存储token
    addUser(state,token){
      state.token=token;
      sessionStorage.token=token;
    },
    // 用户退出 移除token
    removeUser(state){
      sessionStorage.removeItem('token');
      state.token='';
    },

    // 购物车数量
    serverCount(state,payload){
      state.count+=payload.count
    },
    // 自减
    subServerCount(state,payload){
      state.count=payload.count;
    }
  },

  // 4.操作数据 可以异步操作 最终还是提交给mutations
  actions: {
    // 购物车数量
    serverCount(store,payload){
      store.commit('serverCount',{count:payload})
    },
    // 自减
    subServerCount(store,payload){
      store.commit('subServerCount',{count:payload})
    },
  }
})
