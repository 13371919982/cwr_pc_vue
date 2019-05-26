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
        <div class="content" v-for="(item,index) of list" :key="index">
          <div class="top">
            <h3>{{ item.title }}</h3>
            <span @click="btnHandler(item,index)">{{ item.sub }}</span>
          </div>
          <div class="list" :class="{active:item.isAcitve}">
            <div v-for="(item,index) of item.titles" :key="index">
              <router-link :to="{name:'product',params:{kind:item}}">
                <span class="look"></span>
                <span class="title">{{ item }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <div class="list" v-for="(item,index) of productList.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index">
            <router-link :to="{name:'detail',params:{lid:item.lid}}">
              <img :src="item.img" alt="">
            </router-link>
            <p>{{ item.brand }}</p>
            <p>{{ item.detail }}</p>
            <hr>
            <p>{{ item.price | money }}</p>
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
             :page-sizes="pageSizes"
         -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
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
      productList:[],
      minPrice:'',
      maxPrice:'',
      list:[
        { title: '排序', sub:'∨', isAcitve:false, titles:[ '默认排序', '从低到高', '从高到低']},
        { title: '性别', sub:'∨', isAcitve:false, titles:[ '男', '女']},
        { title: '尺码', sub:'∨', isAcitve:false, titles:[ '5岁', '6岁', '7岁', '8岁']},
        { title: '品牌', sub:'∨', isAcitve:false, titles:[ 'AMELIE WANG', 'GIVENCHY ACCESSORIES', 'BILLIEBLUSH', 'CHLOE', 'MANTIS 麦恩缇斯', 'KARL LAGERFELD KIDS', 'MINI RODINI', 'APTAMIL']},
        { title: '颜色', sub:'∨', isAcitve:false, titles:[ '黑色', '白色', '黄色', '粉红色', '浅绿色']},
      ],
      // 当前页数
      currentPage:1,
      // 每页显示个数选择器
      // pageSizes:[3, 6, 12, 24],
      // 每页大小
      pageSize:6,
    }
  },
  methods:{
    // 1.手风琴
    btnHandler(item,index){
      this.list.forEach(elem => {
        elem.sub='∨';
        if(elem.isAcitve!==this.list[index].isAcitve){
          elem.isAcitve=false;
        }
      });
      item.isAcitve=!item.isAcitve;
      if(item.isAcitve){
        item.sub='∧'
      }
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
      this.minPrice?this.minPrice:this.minPrice='';
      this.maxPrice?this.maxPrice:this.maxPrice='';
      this.axios.get(`/product/price`,{params:{
        minPrice:this.minPrice,
        maxPrice:this.maxPrice
      }}).then(res=>{
        if(res.data!=1)
          this.productList=res.data;
      })
    },

    // 3.排序 rank
    // rankHandler(rank){
    //   if(rank==='默认排序'){
    //     this.axios.get('/product/default').then(res=>{
    //       this.productList=res.data;
    //     })
    //   }else if(rank==='从低到高'){
    //     this.axios.get('/product/asc').then(res=>{
    //       this.productList=res.data;
    //     })
    //   }else if(rank==='从高到低'){
    //     this.axios.get('/product/desc').then(res=>{
    //       this.productList=res.data;
    //     })
    //   }
    // },

    // 4.性别 sex  
    // sexHandler(sex){
    //   this.axios.get('/product/sex',{params:{
    //     sex
    //   }}).then(res=>{
    //     this.productList=res.data;
    //   })
    // },
 
    // 5.尺寸 size
    // sizeHandler(size){
    //   this.axios.get('/product/size',{params:{
    //     size
    //   }}).then(res=>{
    //     this.productList=res.data;
    //   })
    // },

    // 6.品牌 brand
    // brandHandler(brand){
    //   this.axios.get('/product/brand',{params:{
    //     brand
    //   }}).then(res=>{
    //     this.productList=res.data;
    //   })
    // },
  
    // 7.颜色 color
    // colorHandler(color){
    //   this.axios.get('/product/color',{params:{
    //     color
    //   }}).then(res=>{
    //     this.productList=res.data;
    //   })
    // },

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
    },

    // 8.keyWords 关键字查询
    kwords(kws){
      this.axios.get('/product/keyWords',{params:{
        kws
      }}).then(res=>{
        if(res.data!=1)
          this.productList=res.data;
      })
    },

    // Header组件 传过来的参数kind
    // 9.kind 分类
    productKind(kind){
      this.axios.get(`/product/list`,{params:{
        kind
      }}).then(res=>{
        this.productList=res.data;
      })
    }
  },

  created(){
    // 接收传来的参数
    this.urlParams=this.$route.params.kind;
    this.productKind(this.urlParams);
    this.kwords(this.urlParams);
  },

  watch:{
    '$route'(to,from){
      // 监听排序的参数
      // this.rankHandler(to.params.kind)

      // 监听性别的参数
      // this.sexHandler(to.params.kind);

      // 监听尺寸的参数
      // this.sizeHandler(to.params.kind);

      // 监听品牌的参数
      // this.brandHandler(to.params.kind);

      // 监听颜色的参数
      // this.colorHandler(to.params.kind);

      // 监听Header组件Nav的参数跳转
      this.productKind(to.params.kind);

      // 监听keyWords 关键字查询
      this.kwords(to.params.kind);
    },
  }
}

</script>

<style scoped>
.product{
  width: 1200px;
  margin: 0 auto 30px;
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
.product>.container>.left>.content>.top{
  display: flex;
  justify-content: space-between;
  line-height: 40px;
}
.product>.container>.left>.content>.top>span{
  font-size: 16px;
  cursor: pointer;
}
.product>.container>.left>.content>.list>div{
  margin-left: 30px;
  text-align: left;
}
.product>.container>.left>div:last-child{
  height: 200px;
  position: relative;
  z-index: 1;
  background: #fff;
}
.product>.container>.left>.content>.list>div>a>.look{
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 10px; 
  border: 1px solid #000;
  border-radius: 3px;
  transition: .5s linear;
}
.product>.container>.left>.content>.list>div>a{
  padding: 6px 0;
}
.product>.container>.left>.content>.list>div>.router-link-active{
  border-bottom: 1px solid #000;
}
.product>.container>.left>.content>.list{
  height: 0;
  border-bottom: 1px solid #777;
  overflow: hidden;
  opacity: .3;
  transition: .5s linear;
}
.product>.container>.left>.content>.active{
  height: 100px;
  border-bottom: 1px solid #777;
  background-color: #fff;
  opacity: 1;
}
.product>.container>.left>.content>.list>div>a>.title{
  line-height: 30px;
  color: #777;
  transition: .5s linear;
  cursor: pointer;
}
.product>.container>.left>.content>.list>div:hover .look{
  background-color: #000; 
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