<template>
  <div class="footer">
    <table></table>
    <ul class="code">
      <li v-for="(item,index) in index_pic_footer" :key="index">
        <img :src="item.img" alt="">
        <p>{{ item.title }}</p>
      </li>
    </ul>
    <table></table>
    <div class="serve">
      <p>
        <a href="">联系我们</a>
        <strong>·</strong>
        <a href="">配送方式</a>
        <strong>·</strong>
        <a href="">隐私权声明</a>
        <strong>·</strong>
        <a href="">条款及细则</a>
        <strong>·</strong>
        <a href="">关于我们</a>
        <strong>·</strong>
        <a href="">关注微博</a>
      </p>
      <p>
        京ICP备16027636号-3&nbsp;&nbsp;&nbsp;|<a href="">营业执照</a>|<a href="">注销账号</a>|&nbsp;&nbsp;&nbsp;版权所有 &copy; 2017 
      </p>
      <p>cloudo CN 保留所有权利</p>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      index_pic_footer:[],
    }
  },
  methods:{
    indexPic(){
      this.axios.get('/index/index_pic_footer?iid_id=4').then(res=>{
        this.index_pic_footer=res.data;
      })
    }
  },
  mounted(){
    this.indexPic();
  }
}

</script>

<style scoped>

.footer{
  position: relative;
  background-color: #000;
  color: #fff;
}
.footer>.code{
  display: flex;
  justify-content: space-around;
  width: 300px;
  margin: 80px auto 30px;
}
.footer>.code>li>p{
  line-height: 30px;
}
.footer>.serve{
  padding-bottom: 80px;
}
.footer>.serve>p{
  line-height: 24px;
}
.footer>.serve>p>a{
  color: #fff;
  margin: 0 10px;
}
</style>