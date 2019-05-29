<template>
  <div class="myorder">
    <ul>
      <li v-for="(item,index) of list" :key="index">
        <router-link :to="`${item.path}`">{{ item.state }}</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[
        {state:'全部订单', path:`/usercenter/myorder/orderall`},
        {state:'待支付', path:`/usercenter/myorder/orderspay`},
        {state:'处理中', path:`/usercenter/myorder/orderhandle`},
        {state:'已完成', path:`/usercenter/myorder/orderdone`},
      ]
    }
  }
}
</script>

<style scoped>
.myorder{
  width: 960px;
}
.myorder>ul{
  display: flex;
  margin: 0 0 30px 0;
}
.myorder>ul>li{
  width: 255px;
  height: 36px;
  line-height: 36px;
  border: 1px solid #ccc;
}
.myorder>ul>li+li{
  border-left: none;
}
.myorder>ul>li>a{
  display: block;
  width: 100%;
  height: 100%;
}
/* 路由高亮 */
.myorder>ul>li>.router-link-active{
  background-color: #000;
  color: #fff;
}
</style>