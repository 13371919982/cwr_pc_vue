<template>
  <div class="userdetail">
    <Nav />
    <h1>检索用户</h1>
    <div class="container">
      <div><label for="">用户编号：</label><input type="text"></div>
    </div>
    <button>提交</button>
  </div>
</template>

<script>

import Nav from './Nav'

export default {
  components:{
    Nav
  }
}

</script>

<style scoped>
.userdetail{
  width: 82%;
  margin-bottom: 50px;
}
.userdetail>h1{
  line-height: 70px;
  border-bottom: 1px solid #ccc;
}
.userdetail>.container{
  width: 800px;
  margin: 0 auto;
}
.userdetail>.container>div{
  display: flex;
  margin-top: 10px;
}
.userdetail>.container>div>label{
  width: 100px;
  text-align: right;
  line-height: 40px;
}
.userdetail>.container>div>input{
  width: 500px;
  height: 30px;
  margin: 0 10px;
  text-indent: 1em;
}
.userdetail>button{
  width: 80px;
  margin-top: 20px;
  line-height: 30px;
  border: none;
  background-color: #333;
  color: #fff;
  transition: .5s;
  cursor: pointer;
}
.userdetail>button:hover{
  opacity: 0.7;
}
</style>