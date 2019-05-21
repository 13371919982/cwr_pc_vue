<template>
  <div class="order">
    <ul class="top">
      <li v-for="(item,index) of pic" :key="index" :style="{backgroundImage:`url(${item.img})`}">{{ item.title }}</li>
    </ul>
    <hr>
    <div class="container">
      <h3>收货地址</h3>
      <p>吴普祥 吴普祥 13371919982 中国 上海市 上海市 奉贤区 西渡镇西闸公路1118弄新南家园184号501室 200000 默认地址</p>
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
    <div>备注：<input type="text"></div>
    <div class="foot">
      <P><input type="checkbox">积分: 0积分(抵用￥0.00)</P>
      <P>运费：0.00元</P>
      <P>礼品卡优惠金额：0.00元</P>
      <P>优惠券优惠金额：0.00元</P>
      <P>商品金额：399.00元</P>
      <P>活动优惠：0.00元</P>
      <P>实付金额：399.00元</P>
    </div>
    <p><button class="btn">订单结算</button></p>
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


.order>p{
  text-align: right;
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
.order>.foot{
  text-align: right;
}
</style>