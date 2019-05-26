<template>
  <div class="user">
    <div class="container">
      <router-link to="/user/login">登录</router-link>
      <router-link to="/user/reg">注册</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  data(){
    return{
      
    }
  }
}

</script>

<style scoped>

.user{
  position: relative;
}
.user>.container{
  display: flex;
  width: 164px;
  margin: 40px auto 30px;
}
.user>.container>a{
  display: block;
  width: 80px;
  height: 40px;
  background-color: #fff;
  line-height: 40px;
  border: 1px solid #ddd;
}
/* 路由高亮 */
.user>.container>.router-link-active{
  background-color: #333;
  border: 1px solid #333;
  color: #fff;
}
</style>