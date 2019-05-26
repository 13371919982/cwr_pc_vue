<template>
  <div class="detail">
    <div class="bread">
      <span>首页 >> {{ kind }} >> {{ detail.detail }}</span>
    </div>
    <div class="container">
      <div class="smImg">
        <div v-for="(item,index) of pic" :key="index"><img :src="item.sm" alt="" @click="imgHandler(index)"></div>
      </div>
      <div class="mdImg">
        <img :src="mdImg" alt="">
        <div :class="{mask}" :style="{left:left+'px',top:top+'px'}"></div>
        <div class="super-mask" @mouseenter="lgEnter" @mouseleave="lgLeave" @mousemove="maskHandler"></div>
        <div class="lgImg" v-show="mask" :style="{backgroundImage:`url(${lgImg})`,backgroundPosition:`${lgLeft}px ${lgTop}px`}">
        </div>
      </div>
      <div class="right">
        <p><a href="#">{{ detail.brand }}</a></p>
        <p>{{ detail.detail }}</p>
        <p>销售价：{{ detail.price | money }}</p>
        <div class="size">
          <div>选择尺寸</div>
          <span @click="sizeHandler">尺码对照表</span>
        </div>
        <!-- 尺寸对照表弹框 start-->
        <div class="sizeAlert" v-show="sizeAlert">
          <div class="alert">
            <p>
              <span>FINGER IN THE NOSE SIZES 12 MONTH - 16 YEARS</span>
              <span @click="closeSizeAlert">x</span>
            </p>
            <table>
              <tr v-for="(item,index) of sizeSpec" :key="index">
                <td v-for="(item,index) of item.age" :key="index">{{ item }}</td>
                <td v-for="(item,index) of item.cm" :key="index">{{ item }}</td>
              </tr>
            </table>
          </div>
          <div class="bgc"></div>
        </div>
        <!-- 尺寸对照表弹框 end-->
        <select v-model="selected">
          <option value="0">请选择尺寸</option>
          <option v-for="(item,index) of specs" :key="index">{{ item }} {{ detail.price | money }} ---- {{ detail.promise }}</option>
        </select>
        <!-- 规格未选弹框 start-->
        <div class="specAlert" v-show="specAlert">
          <div class="alert">
            <p>提示</p>
            <h3>{{ message }}</h3>
          </div>
          <div class="bgc"></div>
        </div>
        <!-- 规格未选弹框 end-->
        <p>数量</p>
        <div class="count">
          <div class="left">
            <button class="add" @click="min">－</button>
            <input type="text" v-model='count' @keyup="fixNum" disabled>
            <button class="add" @click="max">＋</button>
          </div>
          <button class="add-car" @click="addCart">加入购物车</button>
        </div>
        <!-- 确认加入购物车弹框 start-->
        <div class="cartAlert" v-show="cartAlert">
          <div class="alert">
            <h3>PETIT BATEAU</h3>
            <span @click="closeAddAlert">x</span>
            <div class="content">
              <div class="left"><img :src="smImg" alt=""></div>
              <div class="right">
                <p>{{ detail.detail }}</p>
                <p>{{ selected }}</p>
                <p>{{ price | money }}</p>
              </div>
            </div>
            <div class="btns">
              <button class="btn" @click="nextShop">继续购物</button>
              <router-link class="btn" :to="{name:'shoppingcart'}">查看购物袋</router-link>
            </div>
          </div>
          <div class="bgc"></div>
        </div>
        <!-- 确认加入购物车弹框 end-->
        <span @click="addItem"><i :class="icon"></i> {{ text }}</span>
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
          <router-link v-for="(item,index) of matchList" :key="index" :to="{name:'detail',params:{lid:item.lid}}">
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
          <router-link v-for="(item,index) of likeList" :key="index" :to="{name:'detail',params:{lid:item.lid}}">
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

import Count from '@/components/Count'

export default {
  components:{
    Count
  },
  data(){
    return{
      lid:'',
      kind:'',
      detail:'',
      pic:[],
      sizeSpec:[
        {age:['APPROX.AGE', '3 month', '6 month','9 month', '12 month', '18 month', '2 year','4 year', '6 year', '8 year', '10 year', '12 year']},
        {cm:['HEIGHT (cm)', 56, 68, 74, 80, 86, 92, 104, 116, 128, 140, 152]},
      ],
      specs:[],
      selected:0,
      matchList:[],
      likeList:[],
      smImg:'',
      mdImg:'',
      lgImg:'',
      mask:false,
      left:0,
      top:0,
      lgLeft:0,
      lgTop:0,
      width:250,
      count:1,
      message:'请选择尺寸',
      sizeAlert:false,
      specAlert:false,
      cartAlert:false,
      price:'',
      icon:'el-icon-star-off',
      text:'加入您的收藏'
    }
  },
  methods:{
    // 4.点击小图片 中图片切换
    imgHandler(index){
      this.mdImg=this.pic[index].md;
      this.lgImg=this.pic[index].lg;
    },

    // 5.放大镜
    lgEnter(){
      this.mask=true;
      this.lg=true;
    },
    lgLeave(){
      this.mask=false
      this.lg=false;
    },
    maskHandler(e){
      this.left=e.offsetX-this.width/2;
      this.top=e.offsetY-this.width/2;
      if(this.left<0){
        this.left=0;
      }else if(this.left>this.width){
        this.left=this.width;
      }
      if(this.top<0){
        this.top=0;
      }else if(this.top>this.width){
        this.top=this.width;
      }
      // 右边大图片相对中图片的偏移量
      this.lgLeft=-this.left*16/5.8;
      this.lgTop=-this.top*16/5.8;
    },

    // 6.尺寸对照表
    // 打开
    sizeHandler(){
      this.sizeAlert=true;
    },
    // 关闭
    closeSizeAlert(){
      this.sizeAlert=false;
    },

    // 7.数量增减
    fixNum(){
      let fix;
      if(typeof this.count==='string')
        fix=Number(this.n.replace(/\D/g,''));
      else
        fix=this.count;
      if(fix>9 || fix<1)
        fix=1;
      this.count=fix
    },
    min(){
      if(this.count<=1) return;
      this.count--; 
    },
    max(){
      if(this.count>=9) return;
      this.count++;
    },

    // 8.加入购物车
    addCart(){
      if(this.$store.state.token){
        if(this.selected!=0){
          this.cartAlert=true;
        }else{
          this.specAlert=true;
          setTimeout(()=>{
            this.specAlert=false;
          },1500)
        }
      }else{
        this.$router.push({name:'shoppingcart'});
        sessionStorage['lid']=this.lid;
      }
    },
    // 关闭确认购物车
    closeAddAlert(){
      this.cartAlert=false;
    },
    
    // 9.继续购物
    nextShop(){
      this.cartAlert=false;
      this.axios.get('/detail/productLid',{params:{
        uname:sessionStorage.uname,
        lid:this.lid
      }}).then(res=>{
        if(res.data.length>0){
          let lid=res.data[0].lid
          let count=res.data[0].count;
          this.axios.get('/detail/update',{params:{
            lid,
            count
          }}).then(res=>{
            this.specAlert=true;
            this.message='加入购物车成功！'
            setTimeout(()=>{
              this.specAlert=false;
              // this.$store.dispatch('addCountServer',count)
            },1500)
          })
        }else{
          this.axios.get('/detail/addcar',{params:{
            uname:sessionStorage.uname,
            lid:this.lid,
            count:this.count,
          }}).then(res=>{
            this.specAlert=true;
            this.message='加入购物车成功！'
            setTimeout(()=>{
              this.specAlert=false;
              // this.$store.dispatch('addCountServer',this.count)
            },1500)
          })
        }
      })
    },

    // 10.加入和取消收藏
    addItem(){
      if(this.$store.state.token){
        if(this.text!='取消收藏'){
          this.axios.get('/detail/additem',{params:{
            uname:sessionStorage.uname,
            lid:this.lid,
          }}).then(res=>{
            this.icon='el-icon-star-on';
            this.text='取消收藏'
          })
        }else{
          // 取消收藏前先查询出加入收藏的数据 再将其取消
          this.axios.get('/detail/additemlid',{params:{
            uname:sessionStorage.uname,
            lid:this.lid,
          }}).then(res=>{
            if(res.data.length>0){
               this.axios.get('/detail/deleteAdditem',{params:{
                lid:this.lid,
              }}).then(res=>{
                this.icon='el-icon-star-off'; 
                this.text='加入您的收藏';
              })
            }
          })
        }
      }else{
        this.$router.push('/user/login')
      }
    },

    // 1./detail
    lidPrams(lid){
      this.axios.get('/detail/detail',{params:{
        lid
      }}).then(res=>{
        this.pic=res.data;
        this.kind=res.data[0].kind;
        this.detail=res.data[0];
        this.smImg=res.data[0].sm;
        this.mdImg=res.data[0].md;
        this.lgImg=res.data[0].lg;
        this.price=res.data[0].price;
        // 拿出商品所有规格添加到新数组中
        let spec=res.data[0];
        for(let i in spec){
          if(i.indexOf('spec')!=-1){
            if(spec[i]!=null)
              this.specs.push(spec[i]);
          }
        }

        // 2./list 推荐搭配
        this.axios.get('/detail/list',{params:{
          kind:this.kind,
        }}).then(res=>{
          this.matchList=res.data.slice(res.data.length-4);
        })
      })
    }
  },
  created(){
    this.lid=this.$route.params.lid;
    this.lidPrams(this.lid);

    // 3./like 猜你喜欢
    this.axios.get('/detail/like',{params:{
      lid_id:7,
    }}).then(res=>{
      this.likeList=res.data.slice(0,4);
    })

    // 11./additemlid 验证是否加入收藏
    this.axios.get('/detail/additemlid',{params:{
      uname:sessionStorage.uname,
      lid:this.lid
    }}).then(res=>{
      if(res.data.length>0){
        this.icon='el-icon-star-on';
        this.text='取消收藏';
      }
    })
  },
  watch:{
    '$route'(to,from){
      // 监听lid的参数
      this.lidPrams(to.params.lid);
    }
  },
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
.detail>.container>.mdImg{
  position: relative;
}
.detail>.container>.mdImg>img{
  width: 500px;
  height: 500px;
}
.detail>.container>.mdImg>.mask{
  position: absolute;
  width: 250px;
  height: 250px;
  background-color: #ffa;
  opacity: .5;
}
.detail>.container>.mdImg>.super-mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 500px;
}
.detail>.container>.mdImg>.lgImg{
  position: absolute;
  top: 0;
  left: 500px;
  width: 500px;
  height: 500px;
  z-index: 99;
  overflow: hidden;
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
/* 尺码对照表弹框 start*/ 
.detail>.container>.right>.sizeAlert>.bgc{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .2;
}
.detail>.container>.right>.sizeAlert>.alert{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:9999;
  width: 800px;
  margin: auto;
  opacity: 1;
  box-sizing: border-box;
}
.detail>.container>.right>.sizeAlert>.alert>p{
  display: flex;
  justify-content: space-between;
  padding: 0 14px 0 0; 
  border-radius: 5px 5px 0 0;
  background-color: #222;
  line-height: 30px;
  text-align: left;
  text-indent: 1em;
  color: #fff;
  box-sizing: border-box;
}
.detail>.container>.right>.sizeAlert>.alert>p>span+span{
  cursor: pointer;
}
.detail>.container>.right>.sizeAlert>.alert>table{
  width: 100%;
  background-color: #666;
  border-radius: 0 0 3px 3px;
  text-align: center;
  color: #fff;
}
.detail>.container>.right>.sizeAlert>.alert>table>tr>td{
  width: 60px;
  height: 40px;
  border: 1px solid #555;
}
/* 尺寸对照表弹框 end*/
.detail>.container>.right>select{
  width: 100%;
  height: 32px;
  outline: none;
}
.detail>.container>.right>select+p{
  line-height: 50px;
}
/* 规格未选弹框 start */
.detail>.container>.right>.specAlert>.bgc{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .2;
}
.detail>.container>.right>.specAlert>.alert{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:9999;
  margin: auto;
  width: 280px;
  opacity: 1;
}
.detail>.container>.right>.specAlert>.alert>p{
  background-color: #000;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
  text-indent: 1em;
  color: #fff;
  border-radius: 8px 8px 0 0;
}
.detail>.container>.right>.specAlert>.alert>h3{
  background: #fff;
  line-height: 120px;
  text-align: center;
  border-radius: 0 0 8px 8px;
}
/* 规格未选弹框 end */
.detail>.container>.right>.count{
  display: flex;
  justify-content: space-between;
  margin: 0 0 30px 0;
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
  transition: .5s linear;
  cursor: pointer;
}
.detail>.container>.right>.count>.add-car:hover{
  opacity: .7;
}
/* 确认加入购物车弹框 start*/
.detail>.container>.right>.cartAlert>.bgc{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .2;
}
.detail>.container>.right>.cartAlert>.alert{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:9999;
  margin: auto;
  width: 420px;
  background-color: #fff;
  text-align: center;
  opacity: 1;
}
.detail>.container>.right>.cartAlert>.alert>h3{
  width: 160px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
}
.detail>.container>.right>.cartAlert>.alert>span{
  float:right;
  margin: -30px 24px 0 0;
  font-size: 18px;
  cursor: pointer;
}
.detail>.container>.right>.cartAlert>.alert>.content{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 92%;
  height: 200px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
}
.detail>.container>.right>.cartAlert>.alert>.content>.left>img{
  width: 150px;
  height: 150px;
}
.detail>.container>.right>.cartAlert>.alert>.content>.right{
  width: 220px;
  height: 150px; 
  text-align: left;
}
.detail>.container>.right>.cartAlert>.alert>.content>.right>p{
  line-height: 40px;
}
.detail>.container>.right>.cartAlert>.alert>.btns{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 70px;
  margin: 0 auto;
}
.detail>.container>.right>.cartAlert>.alert>.btns>.btn{
  width: 80px;
  height: 30px;
  background-color: #333;
  border: 0;
  color: #fff;
  transition: .5s linear;
  cursor: pointer;
}
.detail>.container>.right>.cartAlert>.alert>.btns>a.btn{
  line-height: 30px;
}
.detail>.container>.right>.cartAlert>.alert>.btns>button:hover{
  opacity: .7;
}
/* 确认加入购物车弹框 end*/
.detail>.container>.right>span{
  margin-top: 40px;
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