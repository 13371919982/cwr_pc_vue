<template>
  <div class="usercenter">
    <div class="container">
      <h3>我的账户</h3>
      <p v-for='(item,index) of list' :key="index">
        <router-link :to="`${item.path}`">{{ item.title }}</router-link>
      </p>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  data(){
    return{
      list:[
        {title:'我的订单', path:'/usercenter/myorder'},
        {title:'我的收藏', path:'/usercenter/mycollection'},
        {title:'我的积分', path:'/usercenter/myscore'},
        {title:'我的卡券', path:'/usercenter/myticket'},
        {title:'个人资料', path:'/usercenter/myinfo'}
      ]
    }
  }
}

</script>

<style scoped>
.usercenter{
  display: flex;
  justify-content: space-between;
  width: 1120px;
  margin: 30px auto;
}
.usercenter>.container{
  text-align: left;
}
.usercenter>.container h3,p{
  line-height: 40px;
}
/* 路由高亮 */
.usercenter>.container>p>.router-link-active{
  padding: 4px 0; 
  border-bottom: 2px solid #2c3e50;
  color: #2c3e50;
  font-weight: bold;
}
</style>