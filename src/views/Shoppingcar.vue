<template>
  <div class="shoppingcar">
    <ul class="top">
      <li class="car">查看购物车</li>
      <li class="settle">订单结算</li>
      <li class="success">订单完成</li>
    </ul>
    <ul class="container">
      <li class="title common">
        <div class="index">
          <input type="checkbox" id="abc"><label for="abc">全选</label>
        </div>
        <div class="img">图片</div>
        <div class="brand">商品名称</div>
        <div class="price">价格</div>
        <div class="count">数量</div>
        <div class="total">小计</div>
        <div class="del">操作</div>
      </li>
      <li class="title product">
        <div class="index">
          <input type="checkbox" id="abc">
        </div>
        <div class="img"><img :src="product.img" alt=""></div>
        <div class="brand">{{ product.brand }}</div>
        <div class="price">{{ product.price | money }}</div>
        <div class="count">{{ count }}</div>
        <div class="total">{{ (product.price*count).toFixed(2) | money }}</div>
        <div class="del">删除</div>
      </li>
    </ul>
    <p><button class="btn">提价订单</button></p>
  </div>
</template>

<script>

export default {
  data(){
    return{
      lid:'',
      count:'',
      product:'',
    }
  },
  mounted(){
    this.lid=this.$route.params.lid;
    this.count=this.$route.params.count;
    this.axios.get('/detail/detail_lid',{params:{
      lid:this.lid
    }}).then(res=>{
      this.product=res.data[0];
    })
  },
}

</script>

<style scoped>
.shoppingcar{
  width: 1200px;
  margin: 60px auto 30px;
}
.shoppingcar>.top{
  display: flex;
}
.shoppingcar>.top>li{
  width: 150px;
  height: 30px;
  color: #fff;
  line-height: 30px;
}
.shoppingcar>.top>.settle{
  color: #000;
}
.shoppingcar>.top>.success{
  color: #000;
}
.shoppingcar>.top>.car{
  background-image: url(../../public/img/list1_1.png);
}
.shoppingcar>.top>.settle{
   background-image: url(../../public/img/list2.png);
}
.shoppingcar>.top>.success{
   background-image: url(../../public/img/list3.png);
}
.shoppingcar>.container{
  margin: 40px 0 20px;
}
.shoppingcar>.container>.title{
  display: flex;
}
.shoppingcar>.container>.title>div{
  line-height: 37px;
  border: 1px solid #ccc;
  border-right: none;
}
.shoppingcar>.container>.title>.index>input{
  vertical-align: middle;
}
.shoppingcar>.container>.title>.del{
  border-right: 1px solid #ccc;
}
.shoppingcar>.container>.common>div{
  border-bottom: none; 
}
.shoppingcar>.container>.product>div{
  line-height: 80px; 
}
.shoppingcar>.container>.title>.index{
  width: 8%;
}
.shoppingcar>.container>.title>.img{
  width: 20%;
}
.shoppingcar>.container>.title>.brand{
  width: 38%;
}
.shoppingcar>.container>.title>.price{
  width: 8%;
}
.shoppingcar>.container>.title>.count{
  width: 10%;
}
.shoppingcar>.container>.title>.total{
  width: 8%;
}
.shoppingcar>.container>.title>.del{
  width: 8%;
}
.shoppingcar>.container>.product>.img>img{
  width: 60px;
  height: 60px;
  vertical-align: middle;
}
.shoppingcar>p{
  text-align: right;
}
.shoppingcar>p>.btn{
  width: 10%;
  height: 40px;
  background-color: #333;
  border: 1px solid #333;
  color: #fff;
}
.shoppingcar>p>.btn:hover{
  opacity: .7;
}
</style>