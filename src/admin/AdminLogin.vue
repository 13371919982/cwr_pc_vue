<template>
  <div class="adminLogin">
    <div class="container">
      <div class="title">
        <hr>
        <h1>管理员登录</h1>
        <hr>
      </div>
      <p><input type="text" placeholder="管理员登录名"></p>
      <p><input type="password" placeholder="管理员登录密码"></p>
      <router-link to="">登录</router-link>
      <hr>
      <h1>CWR 商城后台管理系统</h1>
      <p>&copy;2019 版权所有，CWR.COM</p>
    </div>
  </div>
</template>

<script>

export default {
  
}

</script>

<style scoped>
.adminLogin>.container{
  width: 500px;
  margin: 0 auto;
}
.adminLogin>.container>.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 20px;
}
.adminLogin>.container>.title>hr{
  width: 80px;
  height: 0;
  border: 0;
  border-bottom: 1px solid #ccc;
}
.adminLogin>.container>p{
  line-height: 60px;
}
.adminLogin>.container>p>input{
  width: 360px;
  height: 30px;
  text-indent: 1em;
}
.adminLogin>.container>a{
  display: block;
  border: 1px solid #ccc;
  width: 100px;
  line-height: 30px;
  margin: 0 auto;
  transition: .5s;
}
.adminLogin>.container>a:hover{
  background: #000;
  color: #fff
}
.adminLogin>.container>hr{
  width: 360px;
  margin: 20px auto;
}
.adminLogin>.container h1{
  line-height: 60px;
  color: #000;
}
</style>