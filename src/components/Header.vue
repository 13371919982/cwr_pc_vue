<template>
  <div class="header">
    <div class="container">
      <div class="login">
        <table></table>
        <h1>CWR</h1>
        <ul  class="sign-out" v-show='loginOff'>
          <li><input :class="{active:isActive}" type="text" placeholder="请输入您要搜索的商品" v-model.trim="keyVal" @keyup.enter="keyWords"></li>
          <li><i class="el-icon-search" @click="showSearch"></i></li>
          <li><router-link to="/user/login">登陆</router-link></li>
          <li>|</li>
          <li><router-link to="/user/reg">注册</router-link></li>
          <li>|</li>
          <li>
            <router-link :to="{name:'shoppingcar'}">购物车</router-link>
            <span>(0)</span>
          </li>
        </ul>
        <ul class="sign-up" v-show="loginNo">
          <li><input :class="{active:isActive}" type="text" placeholder="请输入您要搜索的商品" v-model.trim="keyVal" @keyup.enter="keyWords"></li>
          <li><i class="el-icon-search" @click="showSearch"></i></li>
          <li><router-link to="">{{ uname }}</router-link></li>
          <li>|</li>
          <li><span @click="signOut">退出</span></li>
          <li>|</li>
          <li>
            <router-link :to="{name:'shoppingcar'}">购物车</router-link>
            <span>(0)</span>
          </li>
        </ul>
      </div>
      <div class="menu" :class="menuScroll==true?'menuScroll':''">
        <ul>
          <li>
            <router-link to="/">{{ kind.index }}</router-link>
          </li>
          <li class="rela">
            <router-link :to="{name:'product',params:{kind:kind.clothes}}">{{ kind.clothes }}</router-link>
            <div class="drop-menu" v-if='pic!=""'>
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(title,index) of titles' :key='index'>
                    <a href="#">{{ title }}</a>
                  </li>
                </ul>
              </div>
              <img :src="pic[6].img" alt="">
            </div>
          </li>
          <li class="rela">
            <router-link :to="{name:'product',params:{kind:kind.coat}}">{{ kind.coat }}</router-link>
            <div class="drop-menu" v-if='pic!=""'>
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(title,index) in titles' :key='index'>
                    <a href="#">{{ title }}</a>
                  </li>
                </ul>
              </div>
              <img :src="pic[7].img" alt="">
            </div>
          </li>
          <li class="rela">
            <router-link :to="{name:'product',params:{kind:kind.skirt}}">{{ kind.skirt }}</router-link>
            <div class="drop-menu" v-if='pic!=""'>
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(title,index) in titles' :key='index'>
                    <a href="#">{{ title }}</a>
                  </li>
                </ul>
              </div>
              <img :src="pic[8].img" alt="">
            </div>
          </li>
          <li class="rela">
            <router-link :to="{name:'product',params:{kind:kind.fulldress}}">{{ kind.fulldress }}</router-link>
            <div class="drop-menu" v-if='pic!=""'>
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(title,index) in titles' :key='index'>
                    <a href="#">{{ title }}</a>
                  </li>
                </ul>
              </div>
              <img :src="pic[9].img" alt="">
            </div>
          </li>
          <li class="rela">
            <router-link :to="{name:'product',params:{kind:kind.pants}}">{{ kind.pants }}</router-link>
            <div class="drop-menu" v-if='pic!=""'>
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(title,index) in titles' :key='index'>
                    <a href="#">{{ title }}</a>
                  </li>
                </ul>
              </div>
              <img :src="pic[10].img" alt="">
            </div>
          </li>
          <li class="rela">
            <router-link :to="{name:'product',params:{kind:kind.shoe}}">{{ kind.shoe }}</router-link>
            <div class="drop-menu" v-if='pic!=""'>
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(title,index) in titles' :key='index'>
                    <a href="#">{{ title }}</a>
                  </li>
                </ul>
              </div>
              <img :src="pic[11].img" alt="">
            </div>
          </li>
          <li class="rela">
            <router-link :to="{name:'product',params:{kind:kind.woman}}">{{ kind.woman }}</router-link>
            <div class="drop-menu" v-if='pic!=""'>
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(title,index) in titles' :key='index'>
                    <a href="#">{{ title }}</a>
                  </li>
                </ul>
              </div>
              <img :src="pic[6].img" alt="">
            </div>
          </li>
          <li class="rela">
            <router-link :to="{name:'product',params:{kind:kind.cream}}">{{ kind.cream }}</router-link>
            <div class="drop-menu" v-if='pic!=""'>
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(title,index) in titles' :key='index'>
                    <a href="#">{{ title }}</a>
                  </li>
                </ul>
              </div>
              <img :src="pic[6].img" alt="">
            </div>
          </li>
          <li class="rela">
            <router-link :to="{name:'product',params:{kind:kind.gift}}">{{ kind.gift }}</router-link>
            <div class="drop-menu" v-if='pic!=""'>
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(title,index) in titles' :key='index'>
                    <a href="#">{{ title }}</a>
                  </li>
                </ul>
              </div>
              <img :src="pic[6].img" alt="">
            </div>
          </li>
          <li class="rela">
            <router-link :to="{name:'product',params:{kind:kind.shop}}">{{ kind.shop }}</router-link>
            <div class="drop-menu" v-if='pic!=""'>
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(title,index) in titles' :key='index'>
                    <a href="#">{{ title }}</a>
                  </li>
                </ul>
              </div>
              <img :src="pic[6].img" alt="">
            </div>
          </li>
          <li class="rela">
            <a href="#">{{ kind.brand }}</a>
            <div class="drop-menu" v-if='pic!=""'>
              <div class="left-box">
                <strong>分类</strong>
                <ul>
                  <li class="title" v-for='(title,index) in titles' :key='index'>
                    <a href="#">{{ title }}</a>
                  </li>
                </ul>
              </div>
              <img :src="pic[6].img" alt="">
            </div>
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
      loginOff:true,
      loginNo:false,
      isActive:false,
      keyVal:'',
      lid:'',
      kind:{
        index:'首页',
        clothes:'上衣',
        coat:'外套',
        skirt:'裙子',
        fulldress:'礼服',
        pants:'裤装',
        shoe:'童鞋',
        woman:'女士',
        cream:'护肤家具',
        gift:'儿童用品',
        shop:'英国超市',
        brand:'品牌'
      },
      pno:1,
      count:3,
      titles:['短袖T恤/POLO衫','卫衣','长袖T恤/POLO衫','衬衫/休闲上衣','开襟衫/毛衣','连体服','背心','套装','夹克','西装外套','雨衣','斗篷','马甲','外套/大衣','棉服/羽绒服'],
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
      this.$router.push({name:'product',params:{kind:this.keyVal}})
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
      window.removeEventListener('scroll', this.handleScroll);
    },

    // 6.用户退出
    signOut(){
      this.$store.commit('removeUser');
      this.loginOff=true;
      this.loginNo=false
    },

      
  },
  mounted(){
    this.destroyed();
    window.addEventListener('scroll', this.watchScroll);

    this.$nextTick(function(){
      // 5.判断token是否为空
      console.log(this.$store.state.token)
      if(this.$store.state.token){
        this.uname=this.$store.state.token;
        this.loginOff=false;
        this.loginNo=true;
      }
    })
  },
  created(){
    // 4.获取图片 pic
    this.axios.get('/index/pic').then(res=>{
      this.pic=res.data;
    })
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
.header>.container>.login>ul.signUp>li>span{
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
  z-index: 99;
  border-top: 1px solid #999;
  border-bottom: 2px solid #333;
  background-color: #fff;
}
.header>.container>.menu>ul{
  display: flex;
  justify-content: center;
  position: relative;
  width: 1200px;
  height: 47px;
  margin: 0 auto;
}
.header>.container>.menu>ul>li>a{
  display: block;
  width: 88px;
  line-height: 47px;
  transition: .5s;
}
.header>.container>.menu>ul>li.rela>.drop-menu{
  display: flex;
  display: none;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  left: 0;
  top: 49px;
  z-index: 3;
  width: 1200px;
  height: 298px;
  border-bottom: 2px solid #000;
  background-color: #fff;
}
.header>.container>.menu>ul>li.rela>.drop-menu>.left-box{
  height: 250px;
}
.header>.container>.menu>ul>li.rela>.drop-menu>.left-box>ul{
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 600px;
  height: 200px;
}
.header>.container>.menu>ul>li.rela>.drop-menu>.left-box>strong{
  font-size: 15px;
}
.header>.container>.menu>ul>li.rela>.drop-menu>.left-box>ul>li{
  width: 200px;
  height: 32px;
}
.header>.container>.menu>ul>li.rela>.drop-menu>img{
  width: 340px;
  height: 250px;
}
.header>.container>.menu>ul>li.rela:hover>a{
  height: 50px;
  background-color: #000;
  color: #fff;
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