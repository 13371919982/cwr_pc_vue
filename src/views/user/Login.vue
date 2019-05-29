<template>
  <div class="login">
    <div class="container">
      <div class="uname">
        <label for="">用 户 名：</label>
        <div><input type="text" placeholder="请输入手机号" ref="input" v-model.trim="uname"></div>
      </div>
      <div class="upwd">
        <label for="">密 码：</label>
        <div><input type="password" v-model.trim="upwd"></div>
      </div>
      <p class="right"><a href="">忘记密码？</a></p>
      <div class="slide-verify">
        <slide-verify :l="42" :r="10" :w="310" :h="155" @success="onSuccess" :slider-text="text"></slide-verify>
      </div>
      <button @click="login">登录</button>
      <p><input type="checkbox" id='htp-login' checked><label for="htp-login">我已阅读并同意Cloudo Kids隐私权声明</label></p>
    </div>
    <div class="content" v-show="msgAlert">
      <div class="alert">
        <p>提示</p>
        <h3>{{ message }}</h3>
      </div>
      <div class="bgc"></div>
    </div>
  </div>
</template>

<script>

import qs from "qs";

export default {
  data(){
    return{
      uname:'',
      upwd:'',
      text:'请拖动滑块,完成拼图',
      msg:'',
      message:'用户名或者密码为空、未验证滑块！',
      msgAlert:false,
    }
  },
  methods:{
    // 1.非空验证
    login(){
      // 如果用户名、密码为空和滑块未验证
      if(!this.uname || !this.upwd || this.msg!='验证成功'){
        // 弹出2秒的警示框
        this.msgAlert=true;
        setTimeout(()=>{
          this.msgAlert=false;
        },1500) 
      }else{//否则发送请求登录
        this.axios.post('/user/login',
        qs.stringify({
          uname:this.uname,
          upwd:this.upwd
        })).then(res=>{
          // 如果返回结果不为1 登录成功跳转Detail详情页
          if(res.data!=1){
            this.message='恭喜！登录成功';
            this.msgAlert=true;
            this.$store.commit('addUser',res.data)
            sessionStorage['uname']=this.uname;
            setTimeout(()=>{
              this.msgAlert=false;
              // 编程式导航
              sessionStorage.lid?this.$router.push(`/detail/${sessionStorage.lid}`):this.$router.push(`/`);
            },1000)
          }else{
            this.message='用户名或者密码不正确！';
            this.msgAlert=true;
            setTimeout(()=>{
              this.msgAlert=false;
            },1500)
          }
        })
      }
    },

    // 2.滑块
    onSuccess(){
      this.msg='验证成功'
    },
  },

  mounted(){
    // 获取用户名的焦点
    this.$refs.input.focus();
  }
}

</script>

<style scoped>
.login>.container{
  width: 300px;
  margin: 0 auto;
}
.login>.container .uname,.upwd{
  display: flex;
  justify-content: space-between;
  width: 300px;
  height: 40px;
  line-height: 40px;  
}
.login>.container>div>label{
  width: 70px;
  text-align: right;
}
.login input{
  width: 230px;
  height: 30px;
  text-indent: 1em;
  border: none;
  border-bottom: 1px solid #777;
}
.login>.container>.right{
  text-align: right;
  line-height: 40px;
}
.login>.container>button{
  width: 80px;
  height: 40px;
  margin: 10px 0 0;
  background-color: #333;
  color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.login>.container>p{
  line-height: 50px;
}
.login .slide-verify{
  width: 310px;
  margin: 20px auto;
}
.login #htp-login{
  width: 12px;
  height: 12px;
}

/* 警示框 */ 
.login>.content>.bgc{
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
.login>.content>.alert{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:9999;
  margin: auto;
  width: 280px;
  opacity: 1;
}
.login>.content>.alert>p{
  background-color: #000;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
  text-indent: 1em;
  color: #fff;
  border-radius: 8px 8px 0 0;
}
.login>.content>.alert>h3{
  background: #fff;
  line-height: 120px;
  border-radius: 0 0 8px 8px;
}
</style>