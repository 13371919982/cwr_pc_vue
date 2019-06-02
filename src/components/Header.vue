<template>
  <div class="header">
    <div class="container">
      <div class="login">
        <table></table>
        <h1>CWR</h1>
        <ul  class="sign-out" v-if="!$store.state.token">
          <li><input :class="{active:isActive}" type="text" placeholder="请输入您要搜索的商品" v-model.trim="kwords" @keyup.enter="keyWords"></li>
          <li><i class="el-icon-search" @click="showSearch"></i></li>
          <li><router-link :to="`/user/login`">登陆</router-link></li>
          <li>|</li>
          <li><router-link :to="`/user/reg`">注册</router-link></li>
          <li>|</li>
          <li>
            <router-link :to="`/shoppingcart`">购物车<span>(0)</span></router-link>
          </li>
        </ul>
        <ul class="sign-up" v-if="$store.state.token">
          <li><input :class="{active:isActive}" type="text" placeholder="请输入您要搜索的商品" v-model.trim="kwords" @keyup.enter="keyWords"></li>
          <li><i class="el-icon-search" @click="showSearch"></i></li>
          <li><router-link :to="`/usercenter/myorder/orderall`">{{ uname }}</router-link></li>
          <li>|</li>
          <li><span @click="signOut">退出</span></li>
          <li>|</li>
          <li>
            <router-link :to="`/shoppingcart`">购物车<span>({{ getCount }})</span></router-link>
          </li>
        </ul>
      </div>
      <div class="menu" :class="menuScroll==true?'menuScroll':''">
        <ul>
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li class="rela" v-for="(item,index) of kind" :key="index">
            <router-link :to="`/product/head/${item.title}`">{{ item.title }}<span></span></router-link>
            <div class="drop-menu">
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(item,index) of item.titles' :key='index'>
                    <router-link :to="`/product/kwords/${item}`">{{ item }}</router-link>
                  </li>
                </ul>
              </div>
              <img :src="item.img" alt="">
            </div>
          </li>
          <li>
            <router-link to="/">品牌</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isActive:false,
      kwords:'',
      kind:[
        { title: '上衣', img: '/img/1555408286256879.jpg', titles:[ '短袖T恤', '卫衣', '长袖T恤', '休闲上衣', '开襟衫', '连体服', '背心', '套装', '夹克', '西装外套', '雨衣', '斗篷', '马甲', '外套大衣', '棉服羽绒服']},
        { title: '外套', img: '/img/1542187343240787.jpg', titles:[ '斗篷', '棉服羽绒服' ,'外套大衣', '外套',  '夹克']},
        { title: '裙子', img: '/img/1542187306118528.jpg', titles:[ '连衣', '裙半' ,'身裙' ,'背带裙', '裙子']},
        { title: '礼服', img: '/img/1545373955740610.png', titles:[ '礼服女孩', '礼服男孩']},
        { title: '裤装', img: '/img/1542252438696923.jpg', titles:[ '长裤', '打底裤' ,'运动裤', '短裤', '牛仔裤', '套装裤', '装背带裤']},
        { title: '童鞋', img: '/img/1542187672963747.jpg', titles:[ '童鞋', '运动鞋', '便鞋', '靴子', '皮鞋', '凉鞋', '拖鞋', '学步鞋', '室内鞋', '雨鞋']},
        { title: '女士', img: '/img/1542187288392837.jpg', titles:[ '女装', '包包', '女鞋', '饰品', '女士']},
        { title: '护肤家具', img: '/img/1557372226755574.jpg', titles:[ '驱蚊防晒', '洗发沐浴', '妈妈洗护', '收纳出行用品', '益智玩具', '口腔健康', '洗涤清洁']},
        { title: '儿童用品', img: '/img/1554800628724233.jpg', titles:[ '洁面化妆水', '眼部精华', '面部精华面霜', '防晒隔离', '面膜套装']},
        { title: '英国超市', img: '/img/15577474150303.jpg', titles:[ '奶粉米粉', '婴幼辅食', '意面米', '早餐麦片', '饼干薯片', '零食巧克力', '糖果', '咖啡', '茶果酱', '调味烹饪']}
      ],
      pic:[],
      menuScroll:false,
      uname:''
    }
  },
  methods:{
    // 1.搜索框
    showSearch(){
      this.isActive=!this.isActive;
    },

    // 2.keyWords 关键字查询
    keyWords(){
      this.$router.push(`/product/kwords/${this.kwords}`)
    },
    
    // 3.吸顶功能
    watchScroll(){
      // 滚动监听
      let scrollTop=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // menu到顶部的px
      let offsetTop=document.querySelector('.menu').offsetTop;
      scrollTop>offsetTop?this.menuScroll=true:this.menuScroll=false;
    },
    destroyed(){
      window.removeEventListener('scroll', this.watchScroll);
    },

    // 5.用户退出
    signOut(){
      this.$store.commit('removeUser');
      sessionStorage.uname='';
      sessionStorage.lid='';
      this.$router.push(`/user/login`);
    },
  },
  mounted(){
    this.destroyed();
    window.addEventListener('scroll', this.watchScroll);
  },
  created(){
    // 4.判断token是否为空
    if(this.$store.state.token){
      this.uname=sessionStorage.uname;
      // 购物车的数量
      this.axios.get('/shoppingcart/cartList',{params:{
        uname:sessionStorage.uname
      }}).then(res=>{
        // 根据用户名登录的token值
        // 将服务器传来的总数量保存到Vuex定义的count里面
          this.$store.dispatch('serverCount',res.data.reduce((prev,item)=>{
          return prev+item.count;
        },0))
      })
    }
  },
  computed:{
    getCount(){
      return this.$store.getters.getCount;
    }
  }
}
</script>

<style scoped>
.header>.container>.login{
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
}
.header>.container>.login>h1{
  font-size: 50px;
  line-height: 80px;
  color: #000;
  margin-left: 170px;
}
.header>.container>.login>ul{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  position: relative;
}
.header>.container>.login>ul.sign-up{
  width: 220px;
}
.header>.container>.login>ul.sign-up>li>span{
  cursor: pointer;
}
.header>.container>.login>ul>li>.active{
  width: 150px;
  border: 1px solid black;
}
.header>.container>.login>ul>li>input{
  position: absolute;
  left: -150px;
  top: 25px;
  width: 0;
  height: 26px;
  border: 0;
  padding: 0;
  text-indent: 0.5em;
  overflow: hidden;
  transition: .3s linear;
}
.header>.container>.login>ul>li>.el-icon-search{
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}
.header>.container>.menu{
  width: 100%;
  border-top: 1px solid #999;
  border-bottom: 2px solid #333;
  background-color: #fff;
}
.header>.container>.menuScroll{
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  border-top: 1px solid #999;
  border-bottom: 2px solid #333;
  background-color: #fff;
}
.header>.container>.menu>ul{
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 1200px;
  height: 47px;
  margin: 0 auto;
}
.header>.container>.menu>ul>li>a{
  display: block;
  width: 100px;
  line-height: 47px;
}
.header>.container>.menu>ul>li>a>span{
  display: block;
  width: 0;
  margin: 0 auto;
  border-bottom: 1px solid transparent;
  margin-top: -1px;
  transition: .3s linear;
}
.header>.container>.menu>ul>li.rela>.drop-menu{
  display: flex;
  display: none;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  left: 0;
  top: 49px;
  z-index: 100;
  width: 1200px;
  height: 298px;
  border-bottom: 2px solid #000;
  background-color: #fff;
}
.header>.container>.menu>ul>li.rela>.drop-menu>.left-box{
  text-align: left;
  height: 250px;
}
.header>.container>.menu>ul>li.rela>.drop-menu>.left-box>ul{
  display: flex;
  flex-wrap: wrap;
  width: 600px;
}
.header>.container>.menu>ul>li.rela>.drop-menu>.left-box>strong{
  font-size: 14px;
  line-height: 50px;
}
.header>.container>.menu>ul>li.rela>.drop-menu>.left-box>ul>li{
  width: 200px;
  height: 40px;
  line-height: 40px;
}
.header>.container>.menu>ul>li.rela>.drop-menu>img{
  width: 340px;
  height: 250px;
}
.header>.container>.menu>ul>li.rela>a:hover>span{
  width: 100%;
  border-bottom: 1px solid #000;
}
.header>.container>.menu>ul>li.rela:hover>.drop-menu{
  display: block;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.header>.container>.menu>ul>li.rela>.drop-menu>.left-box>ul>li>a:hover{
  color: #999;
}

</style>