<template>
  <div class="productupdate">
    <Nav />
    <h1>修改商品</h1>
    <div class="container">
      <div><label for="">标题：</label><input type="text"><span>商品主标题不能超过128个字符</span></div>
      <div><label for="">单价：</label><input type="text"><span>商品单价为整数</span></div>
      <div>
        <label for="">性别：</label>
        <div><input type="radio" name="1" checked>男<input type="radio" name="1">女</div>
      </div>
      <div><label for="">品牌：</label><input type="text"></div>
      <div><label for="">颜色：</label><input type="text"></div>
      <div><label for="">所属分类：</label><input type="text"></div>
      <div>
        <label for="">规格：</label>
        <div>
          <input type="checkbox" id="i5"><label for="i5">5 YEAR</label>
          <input type="checkbox" id="i6"><label for="i6">6 YEAR</label>
          <input type="checkbox" id="i7"><label for="i7">7 YEAR</label>
          <input type="checkbox" id="i8"><label for="i8">8 YEAR</label>
        </div>
      </div>
      <div><label for="">服务承诺：</label><input type="text"></div>
      <div><label for="">商品详情：</label><input type="text"></div>
      <div>
        <label for="">详情说明：</label>
        <textarea name="" id="" cols="30" rows="10"></textarea></div>
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
.productupdate{
  width: 82%;
  margin-bottom: 50px;
}
.productupdate>h1{
  line-height: 70px;
  border-bottom: 1px solid #ccc;
}
.productupdate>.container{
  width: 800px;
  margin: 0 auto;
}
.productupdate>.container>div{
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.productupdate>.container>div>label{
  width: 100px;
  text-align: right;
  line-height: 40px;
}
.productupdate>.container>div>input{
  width: 500px;
  height: 30px;
  margin: 0 10px;
  text-indent: 1em;
}
.productupdate>.container>div div,textarea{
  margin-left: 10px;
}
.productupdate>.container>div>textarea{
  min-width: 500px;
  min-height: 30px;
  max-width: 500px;
  max-height: 300px;
  padding: 1px;
}
.productupdate>button{
  width: 80px;
  margin-top: 20px;
  line-height: 30px;
  border: none;
  background-color: #333;
  color: #fff;
  transition: .5s;
  cursor: pointer;
}
.productupdate>button:hover{
  opacity: 0.7;
}
</style>