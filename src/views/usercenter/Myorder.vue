<template>
  <div class="myorder">
    <ul>
      <li><router-link :to="{name:'orderall'}">全部订单</router-link></li>
      <li><router-link :to="{name:'orderspay'}">待支付</router-link></li>
      <li><router-link :to="{name:'orderhandle'}">处理中</router-link></li>
      <li><router-link :to="{name:'orderdone'}">已完成</router-link></li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
    
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