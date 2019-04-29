<template>
  <div class="usercenter">
    <div class="container">
      <h3>我的账户</h3>
      <p>我的订单</p>
      <p>我的关注</p>
      <p>我的收藏</p>
      <p>我的积分</p>
      <p>我的卡券</p>
      <p>个人资料</p>
      <p>头像</p>
    </div>
    <Myaccount />
  </div>
</template>

<script>

export default {
  
}

</script>

<style scoped>
.usercenter{
  display: flex;
  justify-content: space-between;
  width: 1160px;
  margin: 30px auto;
}
.usercenter>.container{
  text-align: left;
}
.usercenter>.container h3,p{
  line-height: 40px;
}
</style>