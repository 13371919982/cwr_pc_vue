<template>
  <div class="productlist">
    <Nav />
    <h1>商品列表</h1>
    <div class="search">
      <div class="left">
        <h3>每页显示记录数：</h3>
        <select name="" id="">
          <option value="">10</option>
          <option value="">20</option>
        </select>
      </div>
      <input type="text" placeholder="请输入搜索关键字">
    </div>
    <table>
      <tr>
        <th><input type="checkbox" id="i1"><label for="i1">全选</label></th>
        <th>编号</th>
        <th>图片</th>
        <th>品牌</th>
        <th>主标题</th>
        <th>所属分类</th>
        <th>单价</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in list" :key="index">
        <td><input type="checkbox"></td>
        <td>{{ item.lid }}</td>
        <td><img :src="item.img" alt=""></td>
        <td>{{ item.brand }}</td>
        <td>{{ item.detail }}</td>
        <td>{{ item.kind }}</td>
        <td>{{ item.price | money }}</td>
        <td>
          <div>
            <router-link to="">详情</router-link>
            <router-link to="">修改</router-link>
            <router-link to="">删除</router-link>
          </div>
        </td>
      </tr>
    </table>
    <el-pagination 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="prevPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      :current-page="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.length">
    </el-pagination>
  </div>
</template>

<script>

import Nav from './Nav'

export default {
  components:{
    Nav,
  },
  data(){
    return{
      list:[],
      pno:1,
      count:10,
      lid:''
    }
  },
  methods:{
    prevPage(){
      
    },
    handleSizeChange(val){
      console.log(val)
    },
    handleCurrentChange(val){
      console.log(val)
    }
  },
  mounted(){
    this.axios.get('/product/default').then(res=>{
      this.list=res.data;
    })
  }
}

</script>

<style scoped>
.productlist{
  width: 82%;
  margin-bottom: 50px;
}
.productlist>h1{
  line-height: 70px;
  border-bottom: 1px solid #ccc;
}
.productlist>.search{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 96%;
  height: 80px;
  margin: 0 auto; 
}
.productlist>.search>.left{
  display: flex;
}
.productlist>.search>input{
  width: 200px;
  height: 24px;
  text-indent: .5em;
}
.productlist>table{
  width: 96%;
  margin: 0 auto 20px;
  text-align: left;
}
.productlist>table>tr>th{
  border-bottom: 2px solid #000;
  line-height: 30px;
}
.productlist>table>tr>td{
  height: 50px;
  border-bottom: 1px solid #000;
}
.productlist>table>tr>td>img{
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.productlist>table>tr>td>div{
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: left;
}
</style>