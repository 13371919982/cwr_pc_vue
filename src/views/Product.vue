<template>
  <div class="product">
    <div class="bread">
      <span>首页 >> {{ urlParams }}</span>
    </div>
    <div class="container">
      <div class="left">
        <div class="price">
          <h3>价格</h3>
          <div class="price-box">
            ￥<input type="text" placeholder="最低价" v-model="minPrice"> - <input type="text" placeholder="最高价" v-model="maxPrice"><button @click="priceBtn">确定</button>
          </div>
        </div>
        <div class="rank common">
          <div class="common-top">
            <h3>排序</h3>
            <span @click="btnHandler">{{ sub }}</span>
          </div>
          <div class="common-look" :class="{active:isAcitve}" >
            <div v-for="(item,index) of rank" :key="index"><span class="look"></span><span class="title" @click="rankHandler(index)">{{ item }}</span></div>
          </div>
        </div>
        <div class="sex common">
          <div class="common-top">
            <h3>性别</h3>
            <span @click="btnHandler">{{ sub }}</span>
          </div>
          <div class="common-look" :class="{active:isAcitve}">
            <div v-for="(item,index) of sex" :key="index"><span class="look"></span><span class="title" @click="sexHandler">{{ item }}</span></div>
          </div>
        </div>
        <div class="size common">
          <div class="common-top"> 
            <h3>尺码</h3>
            <span @click="btnHandler">{{ sub }}</span>
          </div>
          <div class="common-look" :class="{active:isAcitve}">
            <div v-for="(item,index) of size" :key="index"><span class="look"></span><span class="title" @click="sizeHandler">{{ item }}</span></div>
          </div>
        </div>
        <div class="brand common">
          <div class="common-top">
            <h3>品牌</h3>
            <span @click="btnHandler">{{ sub }}</span>
          </div>
          <div class="common-look" :class="{active:isAcitve}">
            <div v-for="(item,index) of brand" :key="index"><span class="look"></span><span class="title" @click='brandHandler'>{{ item }}</span></div>
          </div>
        </div>
        <div class="color common">
          <div class="common-top">
            <h3>颜色</h3>
            <span @click="btnHandler">{{ sub }}</span>
          </div>
          <div class="common-look" :class="{active:isAcitve}">
            <div v-for="(item,index) of color" :key="index"><span class="look"></span><span class="title" @click="colorHandler">{{ item }}</span></div>
          </div>
        </div>
        <div></div>
      </div>
      <div class="right">
        <div class="right-top">
          <div class="list" v-for="(item,index) in productList.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index">
            <router-link :to="{name:'laptop_lid',params:{lid:item.lid,kind_id:item.kind}}">
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
        <!-- total  总页数
             sizes  每页大小
             prev   上一页
             pager  当前页
             next   下一页
             jumper 跳转到那一页
         -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="productList.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      urlParams:'',
      isAcitve:false,
      sub:'∧',
      num_isAcitve:true,
      productList:[],
      crumbs:'',
      minPrice:'',
      maxPrice:'',
      rank:[
        '默认排序','从低到高','从高到低'
      ],
      sex:[
        '男','女',
      ],
      size:[
        '5岁','6岁','7岁','8岁'
      ],
      brand:[
        'AMELIE WANG','GIVENCHY ACCESSORIES','BILLIEBLUSH','CHLOE','MANTIS 麦恩缇斯','KARL LAGERFELD KIDS','MINI RODINI','APTAMIL'
      ],
      color:[
        '黑色','白色','黄色','粉红色','浅绿色'
      ],
      // 当前页数
      currentPage:1,
      // 每页显示个数选择器
      pageSizes:[3, 6, 12, 24],
      // 每页大小
      pageSize:3,
    }
  },
  methods:{
    // 1.container>left 左盒子的点击收缩效果
    btnHandler(){
      this.isAcitve=!this.isAcitve;
      this.isAcitve==true?this.sub='∨':this.sub='∧';
    },

    // 2. price 价格查询
    priceBtn(){
      this.productList='';
      this.minPrice=parseInt(this.minPrice);
      this.maxPrice=parseInt(this.maxPrice);
      if(this.minPrice>this.maxPrice){
        let num='';
        num=this.maxPrice;
        this.maxPrice=this.minPrice;
        this.minPrice=num;
      }
      !this.minPrice?this.minPrice='':this.minPrice;
      !this.maxPrice?this.maxPrice='':this.maxPrice;
      this.axios.get(`/product/price`,{params:{
        minPrice:this.minPrice,
        maxPrice:this.maxPrice
      }}).then(res=>{
        if(res.data!=1)
          this.productList=res.data;
      })
    },

    // 3.排序 rank 
    rankHandler(index){
      if(index==0){
          this.urlParams='默认排序';
          this.axios.get('/product/default').then(res=>{
          this.productList=res.data;
        })
      }else if(index==1){
          this.urlParams='从低到高';
          this.axios.get('/product/asc').then(res=>{
          this.productList=res.data;
        })
      }else if(index==2){
          this.urlParams='从高到低';
          this.axios.get('/product/desc').then(res=>{
          this.productList=res.data;
        })
      }
    },

    // 4.性别 sex  
    sexHandler(e){
      let spans=e.target;
      let span=spans.innerHTML;
      this.urlParams=span;
      this.axios.get('/product/sex',{params:{
        sex:span
      }}).then(res=>{
        this.productList=res.data;
      })
    },
 
    // 5.尺寸 size
    sizeHandler(e){
      let spans=e.target;
      let span=spans.innerHTML;
      this.urlParams=span;
      this.axios.get('/product/size',{params:{
        size:span
      }}).then(res=>{
        this.productList=res.data;
      })
    },

    // 6.品牌 brand
    brandHandler(e){
      let spans=e.target;
      let span=spans.innerHTML;
      this.urlParams=span;
      this.axios.get('/product/brand',{params:{
        brand:span
      }}).then(res=>{
        this.productList=res.data;
      })
    },
  
    // 7.颜色 color
    colorHandler(e){
      let spans=e.target;
      let span=spans.innerHTML;
      this.urlParams=span;
      this.axios.get('/product/color',{params:{
        color:span
      }}).then(res=>{
        this.productList=res.data;
      })
    },

    // 8.分页
    handleSizeChange(currentPage){
      // 改变每页显示的条数
      this.PageSize=currentPage;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage=1;
    },

    handleCurrentChange(currentPage){
      // 改变默认的页数
      this.currentPage=currentPage;
    }
  },

  created(){
    this.urlParams=this.$route.params.kind;
    // Header组件 传过来的参数kind
    // 1.kind 分类
    this.axios.get(`/product/list`,{params:{
      kind:this.urlParams,
    }}).then(res=>{
      this.productList=res.data;
    })

    // keyWords 关键字查询
    this.axios.get('/product/keyWords',{params:{
      kws:this.urlParams
    }}).then(res=>{
      if(res.data!=1)
        this.productList=res.data;
    });
  },

  watch:{
    // 监听头部的参数跳转 
    '$route'(to,from){
      this.axios.get(`/product/list`,{params:{
        kind:to.params.kind,
      }}).then(res=>{
        this.productList=res.data;
        this.urlParams=to.params.kind;
      })

      // 监听keyWords 关键字查询
      this.axios.get(`/product/keyWords`,{params:{
        kws:to.params.kind,
      }}).then(res=>{
        if(res.data!=1){
          this.productList=res.data;
          this.urlParams=to.params.kind;
        }
      })
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
  cursor: pointer;
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
</style>