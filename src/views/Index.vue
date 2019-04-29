<template>
  <div class="index">
    <div class="main">
      <!-- Carousel -->
      <Carousel :index_carousel='index_carousel'/>
      <!-- index_pic -->
      <div class="index-pic">
        <div class="container">
          <div class="left-box" v-if="index_pic!=''">
            <img :src="index_pic[0].img" alt="">
            <p>
              {{ index_pic[0].title }}
              <span></span>
            </p>
          </div>
          <div class="right-box" v-if="index_pic!=''">
            <div>
              <img :src="index_pic[1].img" alt="">
              <p class="title">
                {{ index_pic[1].title }}
                <span></span>
              </p>
            </div>
            <div>
              <img :src="index_pic[2].img" alt="">
              <p>
                {{ index_pic[2].title }}
                <span></span>
              </p>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="left-box" v-if="index_pic!=''">
            <img :src="index_pic[3].img" alt="">
            <p>
              {{ index_pic[3].title }}
              <span></span>
            </p>
          </div>
          <div class="right-box" v-if="index_pic!=''">
            <div>
              <img :src="index_pic[4].img" alt="">
              <p class="title">
                {{ index_pic[4].title }}
                <span></span>
              </p>
            </div>
            <div>
              <img :src="index_pic[5].img" alt="">
              <p>
                {{ index_pic[5].title }}
                <span></span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- index_product -->
      <div class="index_product">
        <p>新品推荐</p>
        <div class="newshop">
          <img src="../../public/img/newRight1.png" alt="" @click="leftBtn">
          <div class="newshop-box">
            <ul :style="{marginLeft:width+'px',transition:transition}">
              <li v-for="(item,index) in index_product" :key="index">
                <img :src="item.img" alt="">
                <p>{{ item.brand }}</p>
                <p>{{ item.detail }}</p>
                <p>{{ item.price | money }}</p>
              </li>
            </ul>
          </div>
          <img src="../../public/img/newLeft1.png" alt="" @click="rightBtn">
        </div>
      </div>
      <!-- index_video -->
      <div class="index_video">
        <div class="left">
          <h3>The Animals Observatory Spring-Summer 19 Film</h3>
          <p><router-link :to="{name:'classify',params:{kind:brand}}">即刻选购</router-link></p>
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
      index_carousel:[],
      index_pic:[],
      index_product:[],
      width:0,
      li_width:285,
      transition:'1s',
      brand:'Y3 男士'
    }
  },
  methods:{
    // 1.获取图片 index_carousel
    indexCarousel(){
      this.axios.get('/index/index_carousel').then(res=>{
        this.index_carousel=res.data;
      })
    },
    // 2.获取图片 index_pic
    indexPic(){
      this.axios.get('/index/index_pic').then(res=>{
        this.index_pic=res.data;
      })
    },
    // 3.获取商品 index_product
    indexProduct(){
      this.axios.get('/index/index_product').then(res=>{
        this.index_product=res.data;
      })
    },
    leftBtn(){
      if(this.width>-855)
        this.width-=this.li_width;
    },
    rightBtn(){
      if(this.width<0)
        this.width+=this.li_width;
    }
  },
  mounted(){
    this.indexCarousel();
    this.indexPic();
    this.indexProduct();
  }
}

</script>

<style>

/* index_carousel */
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
.index>.main>.carousel>.el-carousel>.el-carousel__container>.el-carousel__item>img{
  width: 1000px;
  height: 600px;
}

/* index_pic */
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

/* index_product */
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
.index>.main>.index_product>.newshop>.newshop-box{
  width: 1140px;
  height: 300px;
  overflow: hidden;
}
.index>.main>.index_product>.newshop>.newshop-box>ul{
  display: flex;
  width: 1995px;
}
.index>.main>.index_product>.newshop>.newshop-box>ul>li{
  width: 285px;
  height: 300px;
}
.index>.main>.index_product>.newshop>.newshop-box>ul>li>img{
  margin-top: 20px;
  width: 200px;
  height: 200px;
}
.index>.main>.index_product>.newshop>.newshop-box>ul>li>p{
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