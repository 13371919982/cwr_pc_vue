<template>
  <div class="detail">
    <div class="bread">
      <span>首页 >> {{ kind }} >> {{ detail.detail }}</span>
    </div>
    <div class="container">
      <div class="smImg">
        <div v-for="(item,index) in pic" :key="index"><img :src="item.sm" alt="" @click="imgHandler(index)"></div>
      </div>
      <div class="mdImg">
        <img :src="mdImg" alt="" @mouseover="lgOver" @mouseout="lgOut">
      </div>
      <div class="lgImg" :class="{active:isActive}">
        <img :src="lgImg" alt="">
      </div>
      <div class="right">
        <p><a href="#">{{ detail.brand }}</a></p>
        <p>{{ detail.detail }}</p>
        <p>销售价：{{ detail.price | money }}</p>
        <div class="size">
          <div>选择尺寸</div>
          <span @click="sizeHandler">尺码对照表</span>
        </div>
        <div class="content" v-show="sizeAlert">
          <div class="alert">
            <p>
              <span>FINGER IN THE NOSE SIZES 12 MONTH - 16 YEARS</span>
              <span @click="closeHandler">x</span>
            </p>
            <table>
              <tr>
                <td>APPROX.AGE</td>
                <td>HEIGHT (cm)</td>
              </tr>
              <tr>
                <td>12-18 months</td>
                <td>81</td>
              </tr>
              <tr>
                <td>2-3 year</td>
                <td>94</td>
              </tr>
              <tr>
                <td>4-5 year</td>
                <td>110</td>
              </tr>
              <tr>
                <td>6-7 year</td>
                <td>122</td>
              </tr>
              <tr>
                <td>8-9 year</td>
                <td>134</td>
              </tr>
              <tr>
                <td>10-11 year</td>
                <td>146</td>
              </tr>
              <tr>
                <td>12-13 year</td>
                <td>158</td>
              </tr>
              <tr>
                <td>14-15 year</td>
                <td>168</td>
              </tr>
              <tr>
                <td>16 year</td>
                <td>170</td>
              </tr>
            </table>
          </div>
          <div class="bgc"></div>
        </div>
        <select name="" id="">
          <option value="">请选择尺寸</option>
          <option value="">{{ detail.spec_one }} {{ detail.price | money }} ---- {{ detail.promise }}</option>
          <option value="">{{ detail.spec_two }} {{ detail.price | money }} ---- {{ detail.promise }}</option>
          <option value="">{{ detail.spec_three }} {{ detail.price | money }} ---- {{ detail.promise }}</option>
          <option value="">{{ detail.spec_four }} {{ detail.price | money }} ---- {{ detail.promise }}</option>
        </select>
        <p>数量</p>
        <div class="count">
          <div class="left">
            <button class="add" @click="min">－</button>
            <input type="text" v-model='count' @keyup="fixNum">
            <button class="add" @click="max">＋</button>
          </div>
          <button class="add-car">加入购物车</button>
        </div>
        <p class="el-icon-star-off">加入您的收藏</p>
      </div>
    </div>
    <div class="main">
      <div class="product main-box">
        <p>商品描述</p>
        <div class="product-box">{{ detail.details }}</div>
      </div>
      <div class="brand main-box">
        <p>品牌介绍</p>
        <div class="brand-box">
          <div class="left">
            <img :src="detail.brand_img" alt="">
          </div>
          <div class="right">{{ detail.products }}</div>
        </div>
      </div>
      <div class="match main-box common">
        <div>
          <p>推荐搭配</p>
          <a href="">查看更多 +</a>
        </div>
        <div class="match-box">
          <router-link to="" v-for="(item,index) in matchList" :key="index">
            <img :src="item.img" alt="">
            <h4>{{ item.brand }}</h4>
            <p>{{ item.detail }}</p>
            <p>{{ item.price | money }}</p>
          </router-link>
        </div>
      </div>
      <div class="like main-box common">
        <div>
          <p>猜你喜欢</p>
          <a href="">查看更多 +</a>
        </div>
        <div class="like-box">
          <router-link to="" v-for="(item,index) in likeList" :key="index">
            <img :src="item.img" alt="">
            <h4>{{ item.brand }}</h4>
            <p>{{ item.detail }}</p>
            <p>{{ item.price | money }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      lid:'',
      detail:[],
      pic:[],
      kind:'',
      matchList:[],
      likeList:[],
      mdImg:'',
      lgImg:'',
      isActive:false,
      count:1,
      sizeAlert:false
    }
  },
  methods:{
    // 1.中图片切换功能
    imgHandler(index){
      this.mdImg=this.pic[index].md;
      this.lgImg=this.pic[index].lg;
    },

    // 2.商品放大镜效果
    lgOver(e){
      
    },
    lgOut(){
      
    },

    // 3.商品数量
    fixNum(){
      let fix;
      if(typeof this.count==='string')
        fix=Number(this.count.replace(/\D/g,''));
      else
        fix=this.count;
      if(fix>5 || fix<1)
        fix=1;
      this.count=fix
    },
    min(){
      if(this.count<=1) return;
      this.count--; 
    },
    max(){
      if(this.count>=5) return;
      this.count++;
    },

    // 4.尺寸对照表
    // 打开
    sizeHandler(){
      this.sizeAlert=true;
    },
    // 关闭
    closeHandler(){
      this.sizeAlert=false;
    }
  },
  created(){
    // 1./detail
    this.lid=this.$route.params.lid;
    this.axios.get('/detail/detail',{params:{
      lid:this.lid
    }}).then(res=>{
      this.detail=res.data[0];
      this.pic=res.data;
      this.mdImg=res.data[0].md;
    })
    
    // 2./list 推荐搭配
    this.kind=this.$route.params.kind;
    this.axios.get('/detail/list',{params:{
      kind:this.kind,
    }}).then(res=>{
      this.matchList=res.data.slice(res.data.length-4);
    })

    // 3./like 猜你喜欢
    this.axios.get('/detail/like',{params:{
      lid_id:11,
    }}).then(res=>{
      this.likeList=res.data;
    })
  },
  // watch:{
  //   '$route'(to,from){
  //     console.log(to.params,from.params)
  //   }
  // },
}

</script>

<style scoped>
.detail{
  width: 1200px;
  margin: 0 auto;
}
.detail>.bread{
  margin: 10px 0;
  text-align: left;
}
.detail>.container{
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 500px;
}
.detail>.container>.smImg{
  width: 95px;
  height: 325px;
}
.detail>.container>.smImg>div>img{
  width: 95px;
  height: 95px;
  cursor: pointer;
}
.detail>.container>.smImg>div:nth-child(2){
  margin: 20px 0;
}
.detail>.container>.mdImg>img{
  width: 500px;
  height: 500px;
}
.detail>.container>.lgImg{
  position: absolute;
  z-index: 999;
  background-color: #fff;
  overflow: hidden;
  visibility: hidden;
}
.detail>.container>.active{
  left: 169px;
  width: 500px;
  height: 500px; 
  visibility: visible;
  opacity: 1;
}
.detail>.container>.lgImg>img{
  position: fixed;
}
.detail>.container>.right{
  width: 455px;
  height: 352px;
  text-align: left;
}
.detail>.container>.right>p{
  line-height: 36px;
}
.detail>.container>.right>p:first-child>a{
  font-size: 14px;
}
.detail>.container>.right>.size{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  height: 50px;
  border-top: 1px solid #ddd;
}
.detail>.container>.right>.size>span{
  color: #aaa;
  cursor: pointer;
}
/* 尺码对照表 */ 
.detail>.container>.right>.content>.bgc{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 998;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .2;
}
.detail>.container>.right>.content>.alert{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:999;
  width: 500px;
  margin: auto;
  opacity: 1;
  box-sizing: border-box;
}
.detail>.container>.right>.content>.alert>p{
  display: flex;
  justify-content: space-between;
  padding: 0 14px; 
  border-radius: 5px 5px 0 0;
  background-color: #222;
  line-height: 30px;
  text-align: left;
  text-indent: 1em;
  color: #fff;
  box-sizing: border-box;
}
.detail>.container>.right>.content>.alert>p>span+span{
  cursor: pointer;
}
.detail>.container>.right>.content>.alert>table{
  width: 100%;
  background-color: #666;
  border-radius: 0 0 3px 3px;
  text-align: center;
  color: #fff;
}
.detail>.container>.right>.content>.alert>table>tr>td{
  height: 30px;
  border: 1px solid #555;
}
.detail>.container>.right>select{
  width: 100%;
  height: 32px;
  outline: none;
}
.detail>.container>.right>select+p{
  line-height: 50px;
}
.detail>.container>.right>.count{
  display: flex;
  justify-content: space-between;
}
.detail>.container>.right>.count>.left>.add{
  width: 46px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.detail>.container>.right>.count>.left>input{
  width: 46px;
  height: 24px;
  text-align: center;
}
.detail>.container>.right>.count>.add-car{
  width: 280px;
  background-color: #333;
  border: 0;
  color: #fff;
  cursor: pointer;
}
.detail>.container>.right>.count>.add-car:hover{
  opacity: .7;
}
.detail>.container>.right>p:last-child{
  margin: 20px 0 0 20px;
  cursor: pointer;
}
.detail>.main{
  margin: 50px 0;
}
.detail>.main>div>p{
  width: 80px;
  line-height: 30px;
  border-bottom: 1px solid #ddd;
}
.detail>.main>.main-box>div{
  margin: 20px 0;
}
.detail>.main>.product>.product-box{
  height: 40px;
  line-height: 40px;
  text-align: left;
  text-indent: 2em;
  background-color: #f5f5f5;
}
.detail>.main>.brand>.brand-box{
  display: flex;
  justify-content: space-between;
}
.detail>.main>.brand>.brand-box>.left{
  width: 472px;
  height: 250px;
  border-right: 1px solid #ddd;
}
.detail>.main>.brand>.brand-box>.left>img{
  padding: 0 10px;
  width: 452px;
  height: 250px;
}
.detail>.main>.brand>.brand-box>.right{
  width: 600px;
  text-align: left;
  line-height: 30px;
  margin-right: 60px;
}
.detail>.main>.common>div{
  display: flex;
  justify-content: space-between;
}
.detail>.main>.common>div>a>img{
  width: 200px;
  height: 200px;
}
.detail>.main>.common>div>div h4,p{
  line-height: 30px;
}
.detail>.main>.common>div>p{
  width: 80px;
  line-height: 30px;
  border-bottom: 1px solid #ddd
}
</style>