<template>
  <div class="index">
    <div class="main">
      <!-- Carousel -->
      <Carousel :carousel='carousel'/>
      <!-- pic -->
      <div class="index-pic">
        <div class="container">
          <div class="left-box" v-if="pic!=''">
            <img :src="pic[0].img" alt="">
            <p>
              {{ pic[0].title }}
              <span></span>
            </p>
          </div>
          <div class="right-box">
            <div v-for="(item,index) of pic.slice(1,3)" :key="index">
              <img :src="item.img" alt="">
              <p class="title">
                {{ item.title }}
                <span></span>
              </p>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="left-box" v-if="pic!=''">
            <img :src="pic[3].img" alt="">
            <p>
              {{ pic[3].title }}
              <span></span>
            </p>
          </div>
          <div class="right-box">
            <div v-for="(item,index) of pic.slice(4,6)" :key="index">
              <img :src="item.img" alt="">
              <p class="title">
                {{ item.title }}
                <span></span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- productList -->
      <div class="index_product">
        <p>新品推荐</p>
        <div class="newshop">
          <img :class="moved<=0?'active':''" src="/img/newRight1.png" @click="leftBtn">
          <div class="newshop-box">
            <ul :style="{marginLeft:-width*moved+'px',width:width*productList.length+'px'}">
              <li v-for="(item,index) of productList" :key="index">
                <router-link :to="{name:'detail',params:{lid:item.lid,kind:item.kind}}">
                  <img :src="item.img">
                  <p>{{ item.brand }}</p>
                  <p>{{ item.detail }}</p>
                  <p>{{ item.price | money }}</p>
                </router-link>
              </li>
            </ul>
          </div>
          <img :class="moved>=productList.length-4?'active':''" src="/img/newLeft1.png" @click="rightBtn">
        </div>
      </div>
      <!-- index_video -->
      <div class="index_video">
        <div class="left">
          <h3>The Animals Observatory Spring-Summer 19 Film</h3>
          <p><router-link :to="{name:'product',params:{kind:'女士'}}">即刻选购</router-link></p>
        </div>
        <video onended="backFirst()" src="http://img3.cloudokids.cn/h5img/video/pcThe2018ELEPHANT.mov" controls="controls"></video>
      </div>
    </div>
  </div>
</template>

<script>

import Carousel from '@/components/Carousel'

export default {
  components:{
    Carousel
  },
  data(){
    return{
      carousel:[],
      pic:[],
      productList:[],
      moved:0,
      width:285,
    }
  },
  methods:{
    // 4.左右切换图片
    leftBtn(){
      if(this.moved>0)
       this.moved--;
    },
    rightBtn(){
      if(this.moved<this.productList.length-4)
        this.moved++;
    }
  },
  created(){
    // 1.carousel
    this.axios.get('/index/carousel').then(res=>{
      this.carousel=res.data;
    })

    // 2.pic
    this.axios.get('/index/pic').then(res=>{
      this.pic=res.data;
    })

    // 3.productList
    this.axios.get('/index/productList').then(res=>{
      this.productList=res.data.slice(0,7);
    })
  }
}

</script>

<style>

/* carousel */
.index>.main>.carousel>.el-carousel>.el-carousel__container{
  left: -100px;
  height: 600px;
}
.index>.main>.carousel>.el-carousel>.el-carousel__container>.el-carousel__arrow--left{
  left: 200px;
}
.index>.main>.carousel>.el-carousel>.el-carousel__container>.el-carousel__item{
  width: 1000px;
}
.index>.main>.carousel>.el-carousel>.el-carousel__container>.el-carousel__item>a>img{
  width: 1000px;
  height: 600px;
}

/* pic */
.index>.main>.index-pic>.container{
  display: flex;
  justify-content: space-between; 
  width: 1200px;
  margin: 20px auto;
}
.index>.main>.index-pic>.container p{
  display: inline-block;
  font-size: 16px;
  margin:12px 0;
  color: #333;
  font-weight: bold;
}
.index>.main>.index-pic>.container p>span{
  display: block;
  width: 0;
  margin: 0 auto;
  border-bottom: 1px solid transparent;
  transition: 1s;
}
.index>.main>.index-pic>.container img:hover{
  opacity: 0.7;
}
.index>.main>.index-pic>.container>.left-box:hover span{
  width: 90%;
  border-bottom: 1px solid #000;
}
.index>.main>.index-pic>.container>.right-box>div:hover span{
  width: 90%;
  border-bottom: 1px solid #000;
}

/* product */
.index>.main>.index_product>p{
  background: url("../../public/img/newShopTitle.png") no-repeat;
  width: 120px;
  height: 35px;
  background-size: 100% 100%;
  margin: 40px auto;
  line-height: 30px;
  color: #fff;
}
.index>.main>.index_product>.newshop{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
}
.index>.main>.index_product>.newshop>img{
  width: 14px;
  height: 23px;
  cursor: pointer;
}
.index>.main>.index_product>.newshop>.active{
  opacity: 0.3;
  cursor: default;
}
.index>.main>.index_product>.newshop>.newshop-box{
  width: 1140px;
  height: 300px;
  overflow: hidden;
}
.index>.main>.index_product>.newshop>.newshop-box>ul{
  transition: 1s all;
}
.index>.main>.index_product>.newshop>.newshop-box>ul>li{
  float: left;
  width: 285px;
  height: 300px;
}
.index>.main>.index_product>.newshop>.newshop-box>ul>li>a>img{
  margin-top: 20px;
  width: 200px;
  height: 200px;
}
.index>.main>.index_product>.newshop>.newshop-box>ul>li>a>p{
  line-height: 22px;
}

/* index_video */
.index>.main>.index_video{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 1200px;
  height: 400px;
  border: 1px solid #818181;
  margin: 40px auto 60px;
}
.index>.main>.index_video>.left>p{
  line-height: 100px;
}
.index>.main>.index_video>video{
  width: 400px;
  height: 390px;
}
</style>