<template>
  <div class="adminIndex">
    <div class="container">
      <h1>CWR 商城后台</h1>
      <div class="info">
        <img src="../../public/img/user.png" alt="">
        <div>
          <p>欢迎回来,</p>
          <h3>超级管理员</h3>
        </div>
      </div>
      <h3><i class="el-icon-star-on"></i> 后台首页</h3>
      <div class="title">
        <ul>
          <li>
            <p @click="dropmenuP">商品管理<i class="el-icon-arrow-down"></i></p>
            <ul class="productlist" :class="{active:isActiveP}">
              <li :class="{brf:isbrf}"><router-link to="/adminIndex/productadd">添加商品</router-link></li>
              <li><router-link to="/adminIndex/productdelete">删除商品</router-link></li>
              <li><router-link to="/adminIndex/productupdate">修改商品</router-link></li>
              <li><router-link to="/adminIndex/productlist">商品列表</router-link></li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <p @click="dropmenuU">用户管理<i class="el-icon-arrow-down"></i></p>
            <ul class="productlist" :class="{active:isActiveU}">
              <li><router-link to="/adminIndex/userdetail">检索用户</router-link></li>
              <li><router-link to="/adminIndex/userlist">用户列表</router-link></li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <p>订单管理<i class="el-icon-arrow-down"></i></p>
            <ul>
              <!-- <li>添加商品</li>
              <li>删除商品</li>
              <li>修改商品</li>
              <li>商品列表</li> -->
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <p>首页商品管理<i class="el-icon-arrow-down"></i></p>
            <ul>
              <!-- <li>添加商品</li>
              <li>删除商品</li>
              <li>修改商品</li>
              <li>商品列表</li> -->
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <p>功能页面<i class="el-icon-arrow-down"></i></p>
            <ul>
              <!-- <li>添加商品</li>
              <li>删除商品</li>
              <li>修改商品</li>
              <li>商品列表</li> -->
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  data(){
    return{
      isActiveP:false,
      isActiveU:false,
      isbrf:true,
    }
  },
  methods:{
    dropmenuP(){
      this.isActiveP=!this.isActiveP;
    },
    dropmenuU(){
      this.isActiveU=!this.isActiveU;
    }
  }
}

</script>

<style scoped>
.adminIndex{
  display: flex;
}
.adminIndex>.container{
  position: relative;
  width: 18%;
  background-color: #333;
}
.adminIndex>.container>h1{
  line-height: 70px;
  color: #fff;
}
.adminIndex>.container>.info{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  margin: 10px auto 20px; 
}
.adminIndex>.container>.info>img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.adminIndex>.container>.info>div{
  color: #fff;
  text-align: left;
}
.adminIndex>.container>.info>div>p{
  color: #fff;
  line-height: 22px;
}
.adminIndex>.container>h3{
  line-height: 40px;
  background-color: #000;
  border-bottom: 1px solid #444;
  color: #fff;
}
.adminIndex>.container>.title>ul{
  border-bottom: 1px solid #444;
}
.adminIndex>.container>.title>ul>li{
  line-height: 40px;
  background-color: #000;
}
.adminIndex>.container>.title>ul>li>p{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
}
.adminIndex>.container>.title>ul>li>.productlist{
  height: 0px;
  background-color: #333;
  transition: 1s;
  overflow: hidden;
}
.adminIndex>.container>.title>ul>li>.active{
  height: 160px;
}
.adminIndex>.container>.title>ul>li>.productlist>.brf{
  border-right: 5px solid #fff;
  transition: 1s;
}
.adminIndex>.container>.title>ul>li>.productlist>li>a{
  display: block;
  width: 100%;
  color: #fff;
}
</style>