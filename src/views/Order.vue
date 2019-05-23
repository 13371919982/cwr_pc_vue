<template>
  <div class="order">
    <ul class="top">
      <li v-for="(item,index) of pic" :key="index" :style="{backgroundImage:`url(${item.img})`}">{{ item.title }}</li>
    </ul>
    <hr>
    <div class="container">
      <h3>收货地址</h3>
      <p><strong>吴普祥</strong>吴普祥 13371919982 中国 上海市 上海市 奉贤区 西渡镇西闸公路1118弄新南家园184号501室 200000 <strong>默认地址</strong><span>编辑</span></p>
      <span>使用新地址</span>
    </div>
    <hr>
    <div>
      <h3>配送方式</h3>
      <input type="radio" checked>快递包邮(0)元
    </div>
    <hr>
    <ul class="content">
      <li class="title common">
        <div class="img">图片</div>
        <div class="brand">商品名称</div>
        <div class="price">单格：(元)</div>
        <div class="count">数量</div>
        <div class="total">小计：(元)</div>
      </li>
      <li class="title productList">
        <div class="img"><img src="" alt="">图片</div>
        <div class="brand">商品名称</div>
        <div class="price">价格</div>
        <div class="count">数量</div>
        <div class="total">小计</div>
      </li>
    </ul>
    <hr>
    <div class="">
      <h3>使用优惠券/礼品卡</h3>
    </div>
    <hr>
    <div class="comment">备注：<input type="text" maxlength="120"></div>
    <div class="foot">
      <P><input type="checkbox" id="score"><label for="score">积分: 0积分(抵用￥0.00)</label></P>
      <P>运费：0.00元</P>
      <P>礼品卡优惠金额：0.00元</P>
      <P>优惠券优惠金额：0.00元</P>
      <P>商品金额：399.00元</P>
      <P>活动优惠：0.00元</P>
      <P>实付金额：399.00元</P>
    </div>
    <p>
      <button class="btn">返回购物车</button>
      <button class="btn">订单结算</button>
    </p>
  </div>
</template>

<script>

export default {
  data(){
    return{
      pic:[
        {title: '查看购物车', img: '/img/list1.png'},
        {title: '订单结算', img: '/img/list2_2.png'},
        {title: '订单完成', img: '/img/list3.png'}
      ],
    }
  },
  created(){
    
  },
}

</script>

<style scoped>
.order{
  width: 1200px;
  margin: 60px auto 30px;
  text-align: left;
}
.order>.top{
  display: flex;
  margin: 40px 0;
}
.order>.top>li{
  width: 150px;
  height: 30px;
  line-height: 30px;
  color: #000;
  text-align: center;
}
.order>.top>li:nth-child(2){
  color: #fff;
}
.order>.container span{
  color: #0099FF;
  cursor: pointer;
}
.order>.container>h3{
  margin-bottom: 10px;
}
.order>.container>p{
  padding: 0 20px 0 0;
  line-height: 40px;
}
.order>.container>p>strong:first-child{
  display: inline-block;
  width: 60px;
  margin-right: 15px;
  text-align: center;
  border: 1px solid red;
  background: url(../../public/img/selected-icon.png) no-repeat 48px 28px;
}
.order>.container>p>strong+strong{
  display: inline-block;
  height: 20px;
  margin-left: 10px;
  padding: 1px 4px;
  line-height: 20px;
  background-color: #999;
  color: #fff;
}
.order>.container>p>span{
  float: right;
  display: none;
}
.order>.container>span{
  line-height: 30px;
  padding-left: 10px; 
}
.order>.container>p:hover{
  background-color: #eaeaea; 
}
.order>.container>p:hover span{
  display: block;
}
.order>.content{
  margin: 20px 0 20px;
  text-align: center;
}
.order>.content>.title{
  display: flex;
}
.order>.content>.title>div{
  line-height: 37px;
  border: 1px solid #ccc;
  border-right: none;
  border-top: none;
}
.order>.content>li:first-child>div{
  border-top: 1px solid #ccc;
}
.order>.content>.productList>div{
  line-height: 80px; 
}
.order>.content>.title>.img{
  width: 20%;
}
.order>.content>.title>.brand{
  width: 35%;
}
.order>.content>.title>.price{
  width: 15%;
}
.order>.content>.title>.count{
  width: 15%;
}
.order>.content>.title>.total{
  width: 15%;
  border-right: 1px solid #ccc;
}
.order>.content>.productList>.img>img{
  width: 60px;
  height: 60px;
  vertical-align: middle;
}
.order h3{
  margin-bottom: 20px;
}
.order>hr{
  margin: 20px 0 10px 0;
  opacity: .4;
}
.order>.comment>input{
  width: 200px;
  height: 28px;
  text-indent: .5em;
}
.order>.foot{
  text-align: right;
  margin-bottom: 20px;
}
.order>.foot>p{
  line-height: 30px;
}
.order>p{
  text-align: right;
}
.order>p>.btn:first-child{
  margin-right: 20px;
}
.order>p>.btn{
  width: 10%;
  height: 40px;
  background-color: #333;
  border: 1px solid #333;
  color: #fff;
  transition: .5s linear;
  cursor: pointer;
}
.order>p>.btn:hover{
  opacity: .7;
}
</style>