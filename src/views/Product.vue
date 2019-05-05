<template>
  <div class="product">
    <div class="bread">
      <span>首页 >> </span>
      <span>{{ indexParams }}</span>
    </div>
    <div class="container">
      <div class="left">
        <div class="price">
          <h3>价格</h3>
          <div class="price-box">
            ￥<input type="text" placeholder="最低价" v-model="min_price"> - <input type="text" placeholder="最高价" v-model="max_price"><button @click="priceBtn">确定</button>
          </div>
        </div>
        <div class="rank common">
          <div class="common-top">
            <h3>排序</h3>
            <span @click="rank_btn">{{ rank_sub }}</span>
          </div>
          <div class="common-look" :class="{active:rank_isAcitve}" >
            <div @click="rankDefault"><span class="look"></span><span class="title">{{ rank.default }}</span></div>
            <div @click="rankAsc"><span class="look"></span><span class="title">{{ rank.asc }}</span></div>
            <div @click="rankDesc"><span class="look"></span><span class="title">{{ rank.desc }}</span></div>
          </div>
        </div>
        <div class="sex common">
          <div class="common-top">
            <h3>性别</h3>
            <span @click="sex_btn">{{ sex_sub }}</span>
          </div>
          <div class="common-look" :class="{active:sex_isAcitve}">
            <div @click="sexMan"><span class="look"></span><span class="title">{{ sex.man }}</span></div>
            <div @click="sexWoman"><span class="look"></span><span class="title">{{ sex.woman }}</span></div>
          </div>
        </div>
        <div class="size common">
          <div class="common-top"> 
            <h3>尺码</h3>
            <span @click="size_btn">{{ size_sub }}</span>
          </div>
          <div class="common-look" :class="{active:size_isAcitve}">
            <div @click="sizeFive"><span class="look"></span><span class="title">{{ size.five }}</span></div>
            <div @click="sizeSix"><span class="look"></span><span class="title">{{ size.six }}</span></div>
            <div @click="sizeSeven"><span class="look"></span><span class="title">{{ size.seven }}</span></div>
            <div @click="sizeEight"><span class="look"></span><span class="title">{{ size.eight }}</span></div>
          </div>
        </div>
        <div class="brand common">
          <div class="common-top">
            <h3>品牌</h3>
            <span @click="brand_btn">{{ brand_sub }}</span>
          </div>
          <div class="common-look" :class="{active:brand_isAcitve}">
            <div @click="brandAMELIE"><span class="look"></span><span class="title">{{ brand.AMELIE }}</span></div>
            <div @click="brandBEN"><span class="look"></span><span class="title">{{ brand.BEN }}</span></div>
            <div @click="brandBILL"><span class="look"></span><span class="title">{{ brand.BILL }}</span></div>
            <div @click="brandCHLOE"><span class="look"></span><span class="title">{{ brand.CHLOE }}</span></div>
            <div @click="brandCOGITO"><span class="look"></span><span class="title">{{ brand.COGITO }}</span></div>
            <div @click="brandKARL"><span class="look"></span><span class="title">{{ brand.KARL }}</span></div>
            <div @click="brandMINI"><span class="look"></span><span class="title">{{ brand.MINI }}</span></div>
            <div @click="brandTHOMAS"><span class="look"></span><span class="title">{{ brand.THOMAS }}</span></div>
          </div>
        </div>
        <div class="color common">
          <div class="common-top">
            <h3>颜色</h3>
            <span @click="color_btn">{{ color_sub }}</span>
          </div>
          <div class="common-look" :class="{active:color_isAcitve}">
            <div @click="colorBlack"><span class="look"></span><span class="title">{{ color.black }}</span></div>
            <div @click="colorWhite"><span class="look"></span><span class="title">{{ color.white }}</span></div>
            <div @click="colorYellow"><span class="look"></span><span class="title">{{ color.yellow }}</span></div>
            <div @click="colorPink"><span class="look"></span><span class="title">{{ color.pink }}</span></div>
            <div @click="colorReseda"><span class="look"></span><span class="title">{{ color.reseda }}</span></div>
          </div>
        </div>
        <div></div>
      </div>
      <div class="right">
        <div class="right-top">
          <div class="list" v-for="(item,index) in product_list" :key="index">
            <router-link :to="{ name:'laptop_lid',params:{lid:item.lid,kind_id:item.kind}}">
              <img :src="item.img" alt="">
            </router-link>
            <p>{{ item.brand }}</p>
            <p>{{ item.detail }}</p>
            <hr>
            <p>{{ item.price | money}}</p>
            <div class="spec">
              <p>{{ item.spec_one }}</p>
              <p>{{ item.spec_two }}</p>
              <p>{{ item.spec_three }}</p>
              <p>{{ item.spec_four }}</p>
            </div>
          </div>
        </div>
        <div class="msg" v-show="msg">{{ getMsg }}</div>
        <el-pagination
          :page-sizes="[9, 18, 27, 36]"
          :page-size="9"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.product_list.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      indexParams:'',
      rank_isAcitve:false,
      sex_isAcitve:false,
      size_isAcitve:false,
      brand_isAcitve:false,
      color_isAcitve:false,
      rank_sub:'∧',
      sex_sub:'∧',
      size_sub:'∧',
      brand_sub:'∧',
      color_sub:'∧',
      num_isAcitve:true,
      pno:1,
      count:9,
      product_list:[],
      crumbs:'',
      min_price:'',
      max_price:'',
      getMsg:'',
      message:'没有搜索到您要的商品 ！',
      msg:false,
      rank:{
        default:'默认排序',
        asc:'从低到高',
        desc:'从高到低'
      },
      sex:{
        man:'男',
        woman:'女',
      },
      size:{
        five:'5岁',
        six:'6岁',
        seven:'7岁',
        eight:'8岁'
      },
      brand:{
        AMELIE:'AMELIE WANG',
        BAL:'BALMAIN',
        BEN:'BENEFIT',	
        BILL:'BILLIEBLUSH',
        CHLOE:'CHLOE',
        COGITO:'COGITO',
        DRINK:'DRINK',
        JUNIOR:'JUNIOR',
        KARL:'KARL LAGERFELD KIDS',
        MINI:'MINI RODINI',
        THOMAS:'THOMAS&FRIENDS',
        TUPLUS:'TUPLUS',
        WORLD:'WORLD',
        Y3:'Y3 男士'
      },
      color:{
        black:'黑色',
        white:'白色',
        yellow:'黄色',
        pink:'粉红色',
        reseda:'浅绿色'
      }
    }
  },
  methods:{
    // 1.container>left 左盒子的点击收缩效果
    rank_btn(){
      this.rank_isAcitve=!this.rank_isAcitve;
      this.rank_isAcitve==true?this.rank_sub='∨':this.rank_sub='∧';
    },

    sex_btn(){
      this.sex_isAcitve=!this.sex_isAcitve;
      this.sex_isAcitve==true?this.sex_sub='∨':this.sex_sub='∧';
    },

    size_btn(){
      this.size_isAcitve=!this.size_isAcitve;
      this.size_isAcitve==true?this.size_sub='∨':this.size_sub='∧';
    },

    brand_btn(){
      this.brand_isAcitve=!this.brand_isAcitve;
      this.brand_isAcitve==true?this.brand_sub='∨':this.brand_sub='∧';
    },

    color_btn(){
      this.color_isAcitve=!this.color_isAcitve;
      this.color_isAcitve==true?this.color_sub='∨':this.color_sub='∧';
    },

    // 2. price 价格查询
    priceBtn(){
      this.product_list='';
      this.msg=false;
      this.min_price=parseInt(this.min_price);
      this.max_price=parseInt(this.max_price);
      if(this.min_price>this.max_price){
        let num='';
        num=this.max_price;
        this.max_price=this.min_price;
        this.min_price=num;
      }
      !this.min_price?this.min_price='':this.min_price;
      !this.max_price?this.max_price='':this.max_price;
      this.axios.get(`/product/price`,{params:{
        min_price:this.min_price,
        max_price:this.max_price
      }}).then(res=>{
        if(res.data==1){
          this.getMsg=this.message;
          this.msg=true;
        }else
          this.product_list=res.data;
      })
    },

    // 3.1 rankDefault 默认排序 
    rankDefault(){
      this.msg=false;
      this.axios.get('/product/default').then(res=>{
        this.product_list=res.data;
      })
    },
 
    // 3.2 rankAsc 从低到高 升序
    rankAsc(){
      this.msg=false;
      this.axios.get('/product/asc').then(res=>{
        this.product_list=res.data;
      })
    },

    // 3.3 rankDesc 从高到低 降序
    rankDesc(){
      this.msg=false;
      this.axios.get('/product/desc').then(res=>{
        this.product_list=res.data;
      })
    },

    // 4.1 sexMan 男 
    sexMan(){
      this.msg=false;
      this.axios.get('/product/sex',{params:{
        sex:this.sex.man,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 4.2 sexWoman 女 
    sexWoman(){
      this.msg=false;
      this.axios.get('/product/sex',{params:{
        sex:this.sex.woamn,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },
    
    // 5.1 sizeFive 5岁
    sizeFive(){
      this.msg=false;
      this.axios.get('/product/size',{params:{
        size:this.size.five,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 5.2 sizeSix 6岁
    sizeSix(){
      this.msg=false;
      this.axios.get('/product/size',{params:{
        size:this.size.six,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 5.3 sizeSeven 7岁
    sizeSeven(){
      this.msg=false;
      this.axios.get('/product/size',{params:{
        size:this.size.seven,

      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 5.4 sizeEight 8岁
    sizeEight(){
      this.msg=false;
      this.axios.get('/product/size',{params:{
        size:this.size.eight,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },
    
    // 6.1 brand brandAMELIE
    brandAMELIE(){
      this.msg=false;
      this.axios.get('/product/brand',{params:{
        brand:this.brand.AMELIE,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 6.2 brand brandBEN
    brandBEN(){
      this.msg=false;
      this.axios.get('/product/brand',{params:{
        brand:this.brand.BEN,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 6.3 brand brandBILL
    brandBILL(){
      this.msg=false;
      this.axios.get('/product/brand',{params:{
        brand:this.brand.BILL,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 6.4 brand brandCHLOE
    brandCHLOE(){
      this.msg=false;
      this.axios.get('/product/brand',{params:{
        brand:this.brand.CHLOE,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 6.5 brand brandCOGITO
    brandCOGITO(){
      this.msg=false;
      this.axios.get('/product/brand',{params:{
        brand:this.brand.COGITO,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 6.6 brand brandKARL
    brandKARL(){
      this.msg=false;
      this.axios.get('/product/brand',{params:{
        brand:this.brand.KARL,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 6.7 brand brandMINI
    brandMINI(){
      this.msg=false;
      this.axios.get('/product/brand',{params:{
        brand:this.brand.MINI,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 6.8 brand brandTHOMAS
    brandTHOMAS(){
      this.msg=false;
      this.axios.get('/product/brand',{params:{
        brand:this.brand.THOMAS,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 7.1 color colorBlack
    colorBlack(){
      this.msg=false;
      this.axios.get('/product/color',{params:{
        color:this.color.black,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 7.2 color colorWhite
    colorWhite(){
      this.msg=false;
      this.axios.get('/product/color',{params:{
        color:this.color.white,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 7.3 color colorYellow
    colorYellow(){
      this.msg=false;
      this.axios.get('/product/color',{params:{
        color:this.color.yellow,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 7.4 color colorPink
    colorPink(){
      this.msg=false;
      this.axios.get('/product/color',{params:{
        color:this.color.pink,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },

    // 7.5 color colorReseda
    colorReseda(){
      this.msg=false;
      this.axios.get('/product/color',{params:{
        color:this.color.reseda,
      }}).then(res=>{
        this.product_list=res.data;
      })
    },
  },

  mounted(){
    this.indexParams=this.$route.params.kind;
    // Header组件 传过来的参数kind
    // 1.kind 分类
    this.axios.get(`/product/list`,{params:{
      kind:this.indexParams,
    }}).then(res=>{
      this.msg=false;
      this.product_list=res.data;
    })

    // 2.indexParams
    // this.axios.get(`/product/brand`,{params:{
    //   brand:this.indexParams
    // }}).then(res=>{
    //   this.product_list=res.data;
    // })

    // keyWords 关键字查询
    // this.axios.get('/product/keyWords',{params:{
    //   kws:this.indexParams
    // }}).then(res=>{
    //   console.log(res.data)
    //   if(res.data==1){
    //     this.getMsg=this.message;
    //     this.msg=true;
    //   }else
    //     this.product_list=res.data;
    // });
  },

  watch:{
    // 监听头部的参数跳转
    '$route'(to,from){
      this.axios.get(`/product/list`,{params:{
        kind:to.params.kind,
      }}).then(res=>{
        this.product_list=res.data;
        this.indexParams=to.params.kind;
      })

      // 监听keyWords 关键字查询
      // this.axios.get(`/product/keyWords`,{params:{
      //   kws:to.params.kind,
      // }}).then(res=>{
      //   if(res.data==1){
      //     this.getMsg=this.message;
      //     this.msg=true;
      //   }else{
      //     this.product_list=res.data;
      //     this.indexParams=to.params.kind;
      //   }
      // })
    },
  }
}

</script>

<style scoped>
.product{
  width: 1200px;
  margin: 0 auto;
}
.product>.bread{
  margin: 10px 0;
  text-align: left;
}
.product>.container>.left{
  width: 300px;
}
.product>.container{
  display: flex;
}
.product>.container>.left>.price>h3{
  text-align: left;
  line-height: 40px;
}
.product>.container>.left>.price>.price-box{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0 20px;
  border-bottom: 1px solid #777;
}
.product>.container>.left>.price>div>input{
  width: 50px;
  text-align: center;
}
.product>.container>.left>.price>div>button{
  background-color: #fff;
  border: 1px solid #aaa;
  height: 24px;
  cursor: pointer;
  color: #777;
}
.product>.container>.left>.common>.common-top{
  display: flex;
  justify-content: space-between;
  line-height: 40px;
}
.product>.container>.left>.common>.common-top>span{
  cursor: pointer;
  font-size: 16px;
}
.product>.container>.left>.common>.common-look>div{
  margin-left: 30px;
  text-align: left;
  cursor: pointer;
}
.product>.container>.left>.rank>.common-look{
  height: 100px;
}
.product>.container>.left>.sex>.common-look{
  height: 70px;
}
.product>.container>.left>.size>.common-look{
  height: 130px;
}
.product>.container>.left>.brand>.common-look{
  height: 250px;
}
.product>.container>.left>.color>.common-look{
  height: 160px;
}
.product>.container>.left>div:last-child{
  height: 200px;
  position: relative;
  z-index: 1;
  background: #fff;
}
.product>.container>.left .rank,.sex,.size,.brand,.color{
  position: relative;
  z-index: 1;
  background: #fff;
}
.product>.container>.left>.common>.common-look>div>.look{
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 10px; 
  border: 1px solid #000;
  border-radius: 3px;
  transition: .5s;
}
.product>.container>.left>.common>.common-look{
  border-bottom: 1px solid #777;
  transition: 1s;
}
.product>.container>.left>.common>.active{
  height: 0;
  border-bottom: 1px solid #777;
  background-color: #fff;
  opacity: 0.5;
}
.product>.container>.left>.common>.common-look>div>.title{
  line-height: 30px;
  color: #777;
  transition: .5s;
}
.product>.container>.left>.common>.common-look>div:hover .look{
  background-color: #000; 
}
.product>.container>.left>.common>.common-look>div:hover .title{
  color: #333;
}
.product>.container>.right>.right-top{
  display: flex;
  flex-wrap: wrap;
  width: 900px;
  margin-bottom: 20px;
}
.product>.container>.right>.right-top>.list{
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 10px;
}
.product>.container>.right>.right-top>.list>a>img{
  width: 200px;
  height: 200px;
  margin-top: 10px;
}
.product>.container>.right>.right-top>.list>p{
  line-height: 20px;
}
.product>.container>.right>.right-top>.list>hr{
  width: 50px;
}
.product>.container>.right>.right-top>.list>.spec{
  position: absolute;
  top: 0;
  right: -80px;
  width: 0;
  height: 60%;
  background-color: #fff;
  opacity: .7;
  transition: 1s;
  overflow: hidden;
}
.product>.container>.right>.right-top>.list>.spec>p{
  width: 80px;
}
.product>.container>.right>.right-top>.list:hover .spec{
  position: absolute;
  top: 0;
  right: 10px;
  width: 80px;
}
.product>.container>.right>.msg{
  font-size: 30px;
  line-height: 600px;
  text-align: center;
  opacity: 0.5;
}
</style>