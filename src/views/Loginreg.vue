<template>
  <div class="loginreg">
    <div class="container">
      <button :class="{active:isActive_login}" @click="login">登录</button>
      <button :class="{active:isActive_reg}" @click="reg">注册</button>
    </div>
    <div class="login-input" v-show="login_show">
      <div class="uname">
        <label for="">用 户 名：</label>
        <div><input type="text" v-model.trim="uname" placeholder="请输入手机号"></div>
      </div>
      <div class="upwd">
        <label for="">密 码：</label>
        <div><input type="text" v-model.trim="upwd"></div>
      </div>
      <p class="right"><a href="">忘记密码？</a></p>
      <div class="slide-verify">
        <slide-verify :l="42" :r="10" :w="310" :h="155" @success="onSuccess" @fail="onFail" :slider-text="text"></slide-verify>
        <div>{{ msg }}</div>
      </div>
      <button @click="isLogin">登录</button>
      <p><input type="checkbox" id='htp-login' checked><label for="htp-login">我已阅读并同意Cloudo Kids隐私权声明</label></p>
    </div>
    <div class="reg-input" v-show="reg_show">
      <div>
        <label for="">手机号：</label>
        <input type="text" v-model="uphone" placeholder="请输入手机号" @blur="codePhone">
      </div>
      <div class="slide-verify">
        <slide-verify :l="42" :r="10" :w="310" :h="155" @success="onSuccess" @fail="onFail" :slider-text="text"></slide-verify>
        <div>{{ msg }}</div>
      </div>
      <button @click="isReg">注册</button>
      <p><input type="checkbox" id='htp-reg' checked><label for="htp-reg">我已阅读并同意Cloudo Kids隐私权声明</label></p>
    </div>
    <div :class="{active:isActiveMsg}"></div>
    <div class="alert" v-show="unameAlert">
      <p>提示</p>
      <h3>请输入用户名</h3>
    </div>
    <div class="alert" v-show="upwdAlert">
      <p>提示</p>
      <h3>请输入密码</h3>
    </div>
    <div class="alert" v-show="codeAlert">
      <p>提示</p>
      <h3>请拖动滑块验证</h3>
    </div>
    <div class="alert" v-show="codeUphone">
      <p>提示</p>
      <h3>用户名已被注册</h3>
    </div>
    <div class="alert" v-show="regSuccess">
      <p>提示</p>
      <h3>恭喜！注册成功</h3>
    </div>
  </div>
</template>

<script>

import qs from "qs";

export default {
  data(){
    return{
      login_show:true,
      reg_show:false,
      isActive_login:false,
      isActive_reg:false,
      msg: '',
      text: '请拖动滑块,完成拼图',
      uname:'',
      upwd:'',
      uphone:'',
      unameAlert:true,
      upwdAlert:false,
      isActiveMsg:false,
      unameAlert:false,
      upwdAlert:false,
      codeAlert:false,
      codeUphone:false,
      regSuccess:false,
      lid:'',
      kind:''
    }
  },
  methods:{
    login(){
      this.login_show=true;
      this.reg_show=false;
      this.isActive_reg=false; 
      this.isActive_login=true;
    },
    reg(){
      this.reg_show=true;
      this.login_show=false;
      this.isActive_login=false;
      this.isActive_reg=true;
    },
    onSuccess(){
      this.msg = '验证成功'
    },
    onFail(){
      this.msg = '验证失败'
    },

    // 登陆跳转
    isLogin(){
      this.lid=this.$route.params.lid;
      this.kind=this.$route.params.kind;
      if(!this.uname){ // 用户名为空提示
        this.unameAlert=true;
        this.isActiveMsg=true;
        setTimeout(()=>{
          this.unameAlert=false;
          this.isActiveMsg=false;
        },2000)
      }else if(!this.upwd){ // 密码为空提示
        this.upwdAlert=true;
        this.isActiveMsg=true;
        setTimeout(()=>{
          this.upwdAlert=false;
          this.isActiveMsg=false;
        },2000)
      }else if(this.msg!='验证成功'){ // 验证滑块
        this.codeAlert=true;
        this.isActiveMsg=true;
        setTimeout(()=>{
          this.codeAlert=false;
          this.isActiveMsg=false;
        },2000)
      }else{
        this.axios.post('/user/login',
        qs.stringify({
          uname:this.uname,
          upwd:this.upwd
        })).then(res=>{
          if(res.data==1){
            // 编程式导航
            this.$router.push({
              name:'laptop_lid',
              params:{
                lid:this.lid,
                kind:this.kind
              }
            })
          }else{
            this.msg=res.data;
          }
        })
      }
    },

    // 验证用户名是否被占用
    codePhone(){
      if(!this.uphone){
        this.unameAlert=true;
        this.isActiveMsg=true;
        setTimeout(()=>{
          this.unameAlert=false;
          this.isActiveMsg=false;
        },2000)
      }else if(this.uphone.length==11){
        this.axios.get('/user/code',{params:{
          uname:this.uphone
        }}).then(res=>{
          if(res.data==1){
            this.codeUphone=true;
            this.isActiveMsg=true;
            setTimeout(()=>{
              this.codeUphone=false;
              this.isActiveMsg=false;
            },2000)
          }
        })
      }else{
        alert('请输入正确的手机号码')
      }
    },

    // 注册跳转
    isReg(){
      if(this.msg!='验证成功'){// 验证滑块
        this.codeAlert=true;
        this.isActiveMsg=true;
        setTimeout(()=>{
          this.codeAlert=false;
          this.isActiveMsg=false;
        },2000)
      }else{
        this.axios.post('/user/reg',
        qs.stringify({
          uname:this.uphone
        })).then(res=>{
          if(res.data==1){
            this.regSuccess=true;
            this.isActiveMsg=true;
            setTimeout(()=>{
              this.regSuccess=false;
              this.isActiveMsg=false;
              this.$router.push({name:'login'});
            },2000)
          }
        })
      }
    }
  }
}

</script>

<style scoped>

.loginreg{
  position: relative;
}
.loginreg>.container{
  margin: 40px auto 30px;
}
.loginreg>.container>button{
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.loginreg>.container>button.active{
  background-color: #333;
  border: 1px solid #000;
  color: #fff;
}
.loginreg>.login-input{
  width: 300px;
  margin: 0 auto;
}
.loginreg>.login-input .uname,.upwd{
  display: flex;
  justify-content: space-between;
  width: 300px;
  height: 40px;
  line-height: 40px;  
}
.loginreg>.login-input>div>label{
  width: 70px;
  text-align: right;
}
.loginreg input{
  width: 230px;
  height: 30px;
  text-indent: 1em;
  border: none;
  border-bottom: 1px solid #777;
}
.loginreg>.login-input>.right{
  text-align: right;
  line-height: 40px;
}
.loginreg>.login-input>button{
  width: 80px;
  height: 40px;
  margin: 10px 0 0;
  background-color: #333;
  color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.loginreg>.login-input>p{
  line-height: 50px;
}
.loginreg .slide-verify{
  width: 310px;
  margin: 20px auto;
}
.loginreg>.reg-input>button{
  width: 80px;
  height: 40px;
  margin: 10px 0 0;
  background-color: #333;
  color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.loginreg>.reg-input>p{
  line-height: 50px;
}
.loginreg #htp-login,#htp-reg{
  width: 12px;
  height: 12px;
}
.loginreg>.active{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 998;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .2;
}
.loginreg>.alert{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:999;
  margin: auto;
  width: 280px;
  opacity: 1;
}
.loginreg>.alert>p{
  background-color: #000;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
  text-indent: 1em;
  color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.loginreg>.alert>h3{
  background: #fff;
  line-height: 120px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>