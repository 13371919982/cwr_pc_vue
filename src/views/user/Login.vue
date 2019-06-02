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
      <input type="button" @click="login" :disabled='isDisabled' value="登陆" :class="isDisabled?'active':''">
      <p><input type="checkbox" id='htp-login' :checked='!isDisabled'><label for="htp-login">我已阅读并同意Cloudo Kids隐私权声明</label></p>
    </div>
    <my-alert
      v-show="msgAlert"
      :message='message'
    />
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
      message:'',
      msgAlert:false,
    }
  },
  methods:{
    // 1.登陆
    login(){
      // 先验证滑块
      if(this.msg==='验证成功'){
        // 再验证用户名密码是否正确
        this.axios.post('/user/login',qs.stringify({
          uname:this.uname,
          upwd:this.upwd
        })).then(res=>{
          if(res.data.length>0){
            this.message='登录成功';
            this.msgAlert=true;
            this.$store.commit('addUser',res.data)
            sessionStorage['uname']=this.uname;
            setTimeout(()=>{
              this.msgAlert=false;
              // 编程式导航
              sessionStorage['lid']?this.$router.push(`/detail/${sessionStorage['lid']}`):this.$router.push(`/`);
              location.reload();
            },1500)
          }else{
            this.message='用户名或者密码不正确';
            this.msgAlert=true;
            setTimeout(()=>{
              this.msgAlert=false;
            },1500)
          }
        })
      }else{
        this.message='请验证滑块';
        this.msgAlert=true;
        setTimeout(()=>{
          this.msgAlert=false;
        },1500)
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
  },
  computed:{
    isDisabled(){
      // 非空验证
      return !this.uname || !this.upwd;
    }
  },
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
.login>.container>input{
  width: 100px;
  height: 40px;
  margin: 10px 0 0;
  background-color: #333; 
  border: 1px solid #ddd;
  color: #fff;
  text-indent: 0;
  transition: .5s linear;
  cursor: pointer;
}
.login>.container>input.active{
  opacity: .5;
}
.login>.container>input:hover{
  opacity: .5;
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
</style>