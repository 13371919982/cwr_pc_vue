<template>
  <div class="productdelete">
    <Nav />
    <h1>删除商品</h1>
    <div class="container">
      <div><label for="">商品编号：</label><input type="text"></div>
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
.productdelete{
  width: 82%;
  margin-bottom: 50px;
}
.productdelete>h1{
  line-height: 70px;
  border-bottom: 1px solid #ccc;
}
.productdelete>.container{
  width: 800px;
  margin: 0 auto;
}
.productdelete>.container>div{
  display: flex;
  margin-top: 10px;
}
.productdelete>.container>div>label{
  width: 100px;
  text-align: right;
  line-height: 40px;
}
.productdelete>.container>div>input{
  width: 500px;
  height: 30px;
  margin: 0 10px;
  text-indent: 1em;
}
.productdelete>button{
  width: 80px;
  margin-top: 20px;
  line-height: 30px;
  border: none;
  background-color: #333;
  color: #fff;
  transition: .5s;
  cursor: pointer;
}
.productdelete>button:hover{
  opacity: 0.7;
}
</style>