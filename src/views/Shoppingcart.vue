<template>
  <div class="shoppingcart">
    <ul class="top">
      <li v-for="(item,index) of pic" :key="index" :style="{backgroundImage:`url(${item.img})`}">{{ item.title }}</li>
    </ul>
    <ul class="container">
      <li class="title common">
        <div class="index"></div>
        <div class="img">图片</div>
        <div class="brand">商品名称</div>
        <div class="price">单格：(元)</div>
        <div class="count">数量</div>
        <div class="total">小计：(元)</div>
        <div class="del">操作</div>
      </li>
      <li class="title productList" v-for="(item,index) of productList" :key="index">
        <div class="index">
          <input type="checkbox" v-model="item.isChecked" @change="selected">
        </div>
        <div class="img"><img :src="item.img" alt=""></div>
        <div class="brand">{{ item.brand }}</div>
        <div class="price">{{ item.price | money }}</div>
        <div class="count">
          <div class="left">
            <button class="add" @click="min(item)" :disabled='item.count==1'>－</button>
            <input type="text" v-model="item.count" @keyup="fixNum(item)" disabled>
            <button class="add" @click="max(item)" :disabled='item.count>=9'>＋</button>
          </div>
        </div>
        <div class="total">{{ (item.price*item.count).toFixed(2) | money }}</div>
        <div class="del">
          <span @click="delProduct(item,index)">删除</span>
        </div>
        <div class="delAlert" v-show="delAlert">
          <div class="alert">
            <h3>Delete this item</h3>
            <p>确定删除商品嘛?</p>
            <div class="btns">
              <button @click="delHandler">Y e s</button>
              <button @click="closeHandler">N o</button>
            </div>
          </div>
          <div class="bgc"></div>
        </div>
      </li>
      <li class="title common">
        <div class="index">
          <input type="checkbox" id="abc" v-model="checkedAll" @change="selectedAll"><label for="abc">全选</label>
        </div>
        <div class="img"></div>
        <div class="brand"></div>
        <div class="price"></div>
        <div class="count">件数：{{ totalCount }} 件</div>
        <div class="total">总计：{{ totalPrice.toFixed(2) | money }}</div>
        <div class="del"></div>
      </li>
    </ul>
    <p><button class="btn" @click="OrderHandler">提交订单</button></p>
  </div>
</template>

<script>

export default {
  data(){
    return{
      pic:[
        {title: '查看购物车', img: '/img/list1_1.png'},
        {title: '订单结算', img: '/img/list2.png'},
        {title: '订单完成', img: '/img/list3.png'}
      ],
      productList:[],
      checkedAll:false,
      delAlert:false,
      product:'',
      productIndex:'',
    }
  },
  methods:{
    // 1.检测input的值是否为number类型
    fixNum(item){
      let fix;
      if(typeof item.count==='string')
        fix=Number(item.count.replace(/\D/g,''));
        // fix=1;
      else
        fix=item.count;
      if(fix>9 || fix<1)
        fix=1;
      item.count=fix
    },
    min(item){
      if(item.count<=1) return;
      item.count--;
      this.addCount();
    },
    max(item){
      if(item.count>=9) return;
      item.count++;
      this.addCount()
    },

    // 2.全选
    selectedAll(){
      this.productList.forEach(item=> item.isChecked=this.checkedAll)
    },

    // 3.判断是否全选
    selected(){
      this.checkedAll=this.productList.every(item=> item.isChecked)
    },

    // 4.删除商品条目
    delProduct(item,index){
      this.delAlert=true;
      this.product=item;
      this.productIndex=index;
    },
    closeHandler(){
      this.delAlert=false;
    },
    delHandler(){
      this.axios.get('/shoppingcart/delete',{params:{
        lid:this.product.lid
      }}).then(res=>{
        this.delAlert=false;
        this.productList.splice(this.productIndex,1)
      })
    },

    addCount(){
      this.$store.dispatch('subServerCount',this.productList.reduce((prev,item)=>{
        return prev+item.count;
      },0));
    },
    // 6.提交订单
    OrderHandler(){
      console.log(this.productList)
    }
  },
  computed:{
    // 1.计算总价
    totalPrice(){
      return this.productList.reduce((prev,item)=>{
        return prev+(item.isChecked?item.price*item.count:0);
      },0) // 初始值 默认为0
    },

    // 2.总数量
    totalCount(){
      return this.productList.reduce((prev,item)=>{
        return prev+(item.isChecked?item.count:0);
      },0)
    },
  },
  created(){
    // 1.购物车清单
    this.axios.get('/shoppingcart/cartList',{params:{
      uname:sessionStorage.uname
    }}).then(res=>{
      this.productList=res.data;
    })
  },
}

</script>

<style scoped>
.shoppingcart{
  width: 1200px;
  margin: 60px auto 30px;
}
.shoppingcart>.top{
  display: flex;
}
.shoppingcart>.top>li{
  width: 150px;
  height: 30px;
  color: #000;
  line-height: 30px;
}
.shoppingcart>.top>li:first-child{
  color: #fff;
}
.shoppingcart>.container{
  margin: 40px 0 20px;
}
.shoppingcart>.container>.title{
  display: flex;
}
.shoppingcart>.container>.title>div{
  line-height: 37px;
  border: 1px solid #ccc;
  border-right: none;
  border-top: none;
}
.shoppingcart>.container>li:first-child>div{
  border-top: 1px solid #ccc;
}
.shoppingcart>.container>.title>.index>input{
  vertical-align: middle;
}
.shoppingcart>.container>.title>.del{
  border-right: 1px solid #ccc;
}
.shoppingcart>.container>li:last-child>div+div{
  border-left: none;
}
.shoppingcart>.container>li:last-child>div.total{
  text-align: left;
}
.shoppingcart>.container>.productList>div{
  line-height: 80px; 
}
.shoppingcart>.container>.title>.index{
  width: 8%;
}
.shoppingcart>.container>.title>.img{
  width: 20%;
}
.shoppingcart>.container>.title>.brand{
  width: 28%;
}
.shoppingcart>.container>.title>.price{
  width: 8%;
}
.shoppingcart>.container>.title>.count{
  width: 16%;
}
.shoppingcart>.container>.title>.total{
  width: 12%;
}
.shoppingcart>.container>.title>.del{
  width: 8%;
}
.shoppingcart>.container>.productList>.img>img{
  width: 60px;
  height: 60px;
  vertical-align: middle;
}
.shoppingcart>.container>.title>.del>span{
  transition: .5s linear;
  cursor: pointer;
}
.shoppingcart>.container>.title>.del>span:hover{
  opacity: 0.6;
}
.shoppingcart>.container>.productList>.count>.left>.add{
  width: 46px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.shoppingcart>.container>.productList>.count>.left>input{
  width: 46px;
  height: 24px;
  text-align: center;
}
.shoppingcart>p{
  text-align: right;
}
.shoppingcart>p>.btn{
  width: 10%;
  height: 40px;
  background-color: #333;
  border: 1px solid #333;
  color: #fff;
  transition: .5s linear;
  cursor: pointer;
}
.shoppingcart>p>.btn:hover{
  opacity: .7;
}
/* 确认删除商品弹框 start */ 
.shoppingcart>.container>.productList>.delAlert>.bgc{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .2;
}
.shoppingcart>.container>.productList>.delAlert>.alert{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:9999;
  margin: auto;
  width: 420px;
  background-color: #fff;
  text-align: center;
  opacity: 1;
}
.shoppingcart>.container>.productList>.delAlert>.alert>h3{
  width: 160px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
}
.shoppingcart>.container>.productList>.delAlert>.alert>p{
  line-height: 50px;
}
.shoppingcart>.container>.productList>.delAlert>.alert>.btns{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 70px;
  margin: 0 auto;
}
.shoppingcart>.container>.productList>.delAlert>.alert>.btns>button{
  width: 80px;
  height: 30px;
  background-color: #333;
  border: 0;
  color: #fff;
  transition: .5s linear;
  cursor: pointer;
}
.shoppingcart>.container>.productList>.delAlert>.alert>.btns>button:last-child{
  background-color: #fff;
  color: #333;
  border:1px solid #ccc;
}
.shoppingcart>.container>.productList>.delAlert>.alert>.btns>button:hover{
  opacity: .7;
}
.shoppingcart>.container>.productList>.delAlert{
  border-left: none;
}
/* 确认删除商品弹框 end */ 
</style>