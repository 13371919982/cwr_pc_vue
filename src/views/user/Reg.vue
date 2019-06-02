<template>
  <div class="reg">
    <div class="container">
      <div>
        <label for="">手机号：</label>
        <input type="text" placeholder="请输入手机号" ref="input" v-model.trim="uname">
      </div>
      <div class="slide-verify">
        <slide-verify :l="42" :r="10" :w="310" :h="155" @success="onSuccess" :slider-text="text"></slide-verify>
      </div>
      <input type="button" @click="reg" :disabled='isDisabled' value="注册" :class="isDisabled?'active':''">
      <p><input id='htp-reg' type="checkbox" :checked='!isDisabled'><label for="htp-reg">我已阅读并同意Cloudo Kids隐私权声明</label></p>
    </div>
    <my-alert
      v-show="msgAlert"
      :message='message'
    />
  </div>
</template>

<script>

import qs from 'qs'

export default {
  data(){
    return{
      uname:'',
      text:'请拖动滑块,完成拼图',
      msg:'',
      msgAlert:false,
      message:''
    }
  },
  methods:{
    // 1.用户验证及注册
    reg(){
      // 用正则表达式去验证用户输入的号码是否符合要求
      let reg=/^\d{11}$/g;
      // 先验证手机是否匹配正则
      if(reg.test(this.uname)){
        // 再验证滑块
        if(this.msg==='验证成功'){
          // 再验证手机是否被占用
          this.axios.get('/user/code',{params:{
            uname:this.uname
          }}).then(res=>{
            if(res.data.length<=0){
              this.axios.post('/user/reg',qs.stringify({
                uname:this.uname
              })).then(res=>{
                this.message='恭喜！注册成功';
                this.msgAlert=true;
                setTimeout(()=>{
                  this.msgAlert=false;
                  this.$router.push(`/user/login`)
                },1000)
              })
            }else{
              this.message='手机号已被占用';
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
      }else{
        this.message='手机格式不正确';
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
    this.$refs.input.focus();
  },
  computed:{
    isDisabled(){
      // 非空验证
      return !this.uname;
    }
  },
}

</script>

<style scoped>
.reg>.container>input{
  width: 100px;
  height: 40px;
  margin: 10px 0 0;
  background-color: #333;
  color: #fff;
  border: 1px solid #ddd;
  transition: .5s linear;
  cursor: pointer;
}
.reg>.container>input.active{
  opacity: .5;
}
.reg>.container>input:hover{
  opacity: .5;
}
.reg>.container>div>input{
  width: 230px;
  height: 30px;
  text-indent: 1em;
  border: none;
  border-bottom: 1px solid #777;
}
.reg>.container>p{
  line-height: 50px;
}
.reg .slide-verify{
  width: 310px;
  margin: 20px auto;
}
.reg #htp-reg{
  width: 12px;
  height: 12px;
}
</style>