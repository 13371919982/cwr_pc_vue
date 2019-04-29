<template>
  <div class="login—reg">
    <div class="container">
      <button :class="{active:isActive_login}" @click="login">登录</button>
      <button :class="{active:isActive_reg}" @click="reg">注册</button>
    </div>
    <div class="login-input" v-show="login_show">
      <div class="uname">
        <label for="">用 户 名：</label>
        <div><input type="text"></div>
      </div>
      <div class="upwd">
        <label for="">密 码：</label>
        <div><input type="text"></div>
      </div>
      <p class="right"><a href="">忘记密码？</a></p>
      <div class="slide-verify">
        <slide-verify :l="42" :r="10" :w="310" :h="155" @success="onSuccess" @fail="onFail" :slider-text="text"></slide-verify>
        <div>{{ msg }}</div>
      </div>
      <button>登录</button>
      <p><input type="checkbox" id='htp-login' checked><label for="htp-login">我已阅读并同意Cloudo Kids隐私权声明</label></p>
    </div>
    <div class="reg-input" v-show="reg_show">
      <div>
        <label for="">手机号：</label>
        <input type="text">
      </div>
      <div class="slide-verify">
        <slide-verify :l="42" :r="10" :w="310" :h="155" @success="onSuccess" @fail="onFail" :slider-text="text"></slide-verify>
        <div>{{ msg }}</div>
      </div>
      <button>注册</button>
      <p><input type="checkbox" id='htp-reg' checked><label for="htp-reg">我已阅读并同意Cloudo Kids隐私权声明</label></p>
    </div>
  </div>  
</template>

<script>

export default {
  data(){
    return{
      login_show:true,
      reg_show:false,
      isActive_login:true,
      isActive_reg:false,
      msg: '',
      text: '向右滑',
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
  }
}

</script>

<style scoped>

.login—reg>.container{
  margin: 40px auto 30px;
}
.login—reg>.container>button{
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.login—reg>.container>button.active{
  background-color: #333;
  border: 1px solid #000;
  color: #fff;
}
.login—reg>.login-input{
  width: 300px;
  margin: 0 auto;
}
.login—reg>.login-input .uname,.upwd{
  display: flex;
  justify-content: space-between;
  width: 300px;
  height: 40px;
  line-height: 40px;  
}
.login—reg>.login-input>div>label{
  width: 60px;
  text-align: right;
}
.login—reg input{
  width: 230px;
  height: 30px;
  text-indent: 1em;
  border: none;
  border-bottom: 1px solid #777;
}
.login—reg>.login-input>.right{
  text-align: right;
  line-height: 40px;
}
.login—reg>.login-input>button{
  width: 80px;
  height: 40px;
  margin: 10px 0 0;
  background-color: #333;
  color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.login—reg>.login-input>p{
  line-height: 50px;
}
.login—reg .slide-verify{
  width: 310px;
  margin: 20px auto;
}
.login—reg .slide-verify>div{
  margin-top: 10px;
  color: rgb(10, 247, 10);
}
.login—reg>.reg-input>button{
  width: 80px;
  height: 40px;
  margin: 10px 0 0;
  background-color: #333;
  color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.login—reg>.reg-input>p{
  line-height: 50px;
}
.login—reg #htp-login,#htp-reg{
  width: 12px;
  height: 12px;
}
</style>