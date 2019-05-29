<template>
  <div class="mycollection">
    <ul>
      <li v-for="(item,index) of list" :key="index">{{ item }}</li>
    </ul>
    <ul class="container" v-for="(item,index) of productList" :key="index">
      <li><router-link :to="`/detail/${item.lid}`"><img :src="item.img" alt=""></router-link></li>
      <li>{{ item.detail }}</li>
      <li>{{ item.price | money }}</li>
      <li><span @click="cancel(item,index)">取消收藏</span></li>
    </ul>
    <h1 v-if="productList.length==0">快去加入收藏吧 ~ ~</h1>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:['图片','商品名称','价格','操作'],
      productList:[],
      delAlert:true
    }
  },
  methods:{
    cancel(item,index){
      // 取消收藏前先查询出加入收藏的数据 再将其取消
      console.log(index)
      this.axios.get('/detail/additemlid',{params:{
        uname:sessionStorage.uname,
        lid:item.lid,
      }}).then(res=>{
        if(res.data.length>0){
          this.axios.get('/detail/deleteAdditem',{params:{
            lid:item.lid,
          }}).then(res=>{
            this.productList.splice(index,1)
          })
        }
      })
    }
  },
  created(){
    this.axios.get('/user/additemList',{params:{
      uname:sessionStorage.uname
    }}).then(res=>{
      this.productList=res.data;
    })
  }
}
</script>

<style scoped>
.mycollection{
  width: 960px;
  margin-bottom: 100px;
}
.mycollection>ul{
  display: flex;
  align-items: center;
  border-bottom: 1px solid #333;
}
.mycollection>ul:first-child{
  height: 30px;
}
.mycollection>ul>li{
  width: 25%;
}
.mycollection>ul.container{
  height: 80px;
}
.mycollection>ul.container>li>a>img{
  width: 60px;
  height: 60px;
}
.mycollection>ul.container>li>span{
  color: red;
  cursor: pointer;
}
.mycollection>h1{
  opacity: 0.5;
  line-height: 300px;
}
</style>