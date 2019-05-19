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
      <button @click="reg">注册</button>
      <p><input id='htp-reg' type="checkbox" checked><label for="htp-reg">我已阅读并同意Cloudo Kids隐私权声明</label></p>
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

import qs from 'qs'

export default {
  data(){
    return{
      uname:'',
      text:'请拖动滑块,完成拼图',
      msg:'',
      msgAlert:false,
      message:'手机不正确、为空、未验证滑块！'
    }
  },
  methods:{
    // 1.用户验证及注册
    reg(){
      // 用正则表达式去验证用户输入的号码是否符合要求
      let reg=/^\d{11}$/g;
      if(!reg.test(this.uname) || !this.uname || this.msg!='验证成功'){
        this.msgAlert=true;
        setTimeout(()=>{
          this.msgAlert=false;
        },1500)
      }else{
        this.axios.get('/user/code',{params:{
          uname:this.uname
        }}).then(res=>{
          if(res.data!=1){
            this.message=res.data;
            this.msgAlert=true;
            setTimeout(()=>{
              this.msgAlert=false;
            },1500)
          }else{
            this.axios.post('/user/reg',qs.stringify({
              uname:this.uname
            })).then(res=>{
              this.message=res.data;
              this.msgAlert=true;
              setTimeout(()=>{
                this.msgAlert=false;
                this.$router.push('/user/login')
              },1000)
            })
          }
        })
      }
    },

    // 2.滑块
    onSuccess(){
      this.msg='验证成功'
    },
  },
}

</script>

<style scoped>
.reg>.container>button{
  width: 80px;
  height: 40px;
  margin: 10px 0 0;
  background-color: #333;
  color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.reg input{
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

/* 警示框 */ 
.reg>.content>.bgc{
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
.reg>.content>.alert{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:9999;
  margin: auto;
  width: 280px;
  opacity: 1;
}
.reg>.content>.alert>p{
  background-color: #000;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
  text-indent: 1em;
  color: #fff;
  border-radius: 0 0 8px 8px;
}
.reg>.content>.alert>h3{
  background: #fff;
  line-height: 120px;
  border-radius: 8px 8px 0 0;
}
</style>