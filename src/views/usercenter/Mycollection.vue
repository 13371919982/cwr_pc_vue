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
    <my-del-alert
      v-show='delAlert' 
      :msg='msg'  
      :closeHandler='closeHandler' 
      :delHandler='delHandler'
    />
    <h1 v-if="productList.length==0">快去加入收藏吧 ~ ~</h1>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:['图片','商品名称','价格','操作'],
      productList:[],
      msg:'确认取消收藏嘛？',
      delAlert:false,
      lid:'',
      index:''
    }
  },
  methods:{
    // 2.取消收藏
    cancel(item,index){
      // 取消收藏前先查询出加入收藏的数据 再将其取消
      this.delAlert=true;
      this.lid=item.lid;
      this.index=index;
    },
    closeHandler(){
      this.delAlert=false;
    },
    delHandler(){
      this.axios.get('/detail/deleteAdditem',{params:{
        uname:sessionStorage['uname'],
        lid:this.lid,
      }}).then(res=>{
        this.delAlert=false;
        this.productList.splice(this.index,1)
      })
    }
  },
  created(){
    // 1.收藏列表
    this.axios.get('/user/additemList',{params:{
      uname:sessionStorage['uname']
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