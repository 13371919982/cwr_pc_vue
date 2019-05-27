<template>
  <div class="myinfo">
    <div class="top">
      <h3>个人资料</h3>
      <div>
        <span @click="compileHandler">编辑</span>
        <span @click="updatePwd">修改密码</span>
      </div>
    </div>
    <ul class="info">
      <li>
        <label for="">手 机：</label>
        <span>{{ uname }}</span>
      </li>
      <li>
        <label for="">邮 箱：</label>
        <input :class="!isDisabled?'active':''" type="text" v-model="email" :disabled='isDisabled' @blur="isEmail">
        <span>{{ info }}</span>
      </li>
      <li> 
        <label for="">您的宝宝：</label>
        <label v-show="isDisabled">
          <span>{{ yearinfo }}{{ sexinfo }}</span>
        </label>
        <select v-show="!isDisabled" v-model="year">
          <option value="0">请选择年份</option>
          <option v-for="(item,index) of years" :key="index">{{ item }}</option>
        </select>
        <select v-show="!isDisabled" v-model="sex">
          <option value="0">请选择宝宝性别</option>
          <option v-for="(item,index) of sexs" :key="index">{{ item }}</option>
        </select>
      </li>
    </ul>
    <div class="btns" v-show="!isDisabled">
      <button @click="saveHandler">保存</button>
      <button @click="cancelHandler">取消</button>
    </div>
    <div class="top foot">
      <h3>收货地址</h3>
      <span>添加</span>
    </div>
    <ul class="location">
      <li>
        <div>
          <span>吴普祥 </span>
          <span>13371919982 </span>
          <span>中国 </span>
          <span>上海市 </span>
          <span>上海市 </span>
          <span>奉贤区 </span>
          <span>西渡镇西闸公路1118弄新南家园184号501室 </span>
          <span>200000</span>
          <img src="/img/address.png" alt="">
        </div>
        <div>
          <span>编辑</span>
          <span>删除</span>
        </div>
      </li>
    </ul>
    <!-- 用户修改弹窗 -->
    <div class="content" v-show="msgAlert">
      <div class="alert">
        <p>提示</p>
        <h3>{{ message }}</h3>
      </div>
      <div class="bgc"></div>
    </div>

    <!-- 密码弹窗 -->
    <div class="content pwd" v-show="pwdAlert">
      <div class="alert">
        <h4>修改密码</h4>
        <ul>
          <li>
            <label>旧密码：</label>
            <input type="password" @blur='codePwd' v-model="oldPwd">
            <span>{{ oldMsg }}</span>
          </li>
          <li>
            <label>新密码：</label>
            <input type="password" v-model="firstPwd" @blur="isPass" placeholder="长度6-12位，字母和数字组成">
            <span>{{ msg }}</span>
          </li>
          <li>
            <label>确认密码：</label>
            <input type="password" v-model="secondPwd" @blur="isPass" placeholder="长度6-12位，字母和数字组成">
            <span>{{ msg }}</span>
          </li>
        </ul>
        <div class="btns">
          <button @click="submit">提交</button>
          <button @click="closeHandler">取消</button>
        </div>
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
      years:['2019','2018','2017','2016','2015','2014','2013','2012','2011','2010'],
      sexs:['Boy','Girl'],
      isDisabled:true,
      uname:'',
      upwd:'',
      email:'',
      year:'',
      sex:'',
      yearinfo:'',
      sexinfo:'',
      msgAlert:false,
      message:'',
      info:'',
      pwdAlert:false,
      oldPwd:'',
      firstPwd:'',
      secondPwd:'',
      oldMsg:'',
      msg:''
    }
  },
  methods:{
    // 1.获取用户信息
    userinfo(uname){
      this.axios.get('/user/detail',{params:{
        uname
      }}).then(res=>{
        this.uname=res.data[0].uname;
        this.upwd=res.data[0].upwd;
        this.email=res.data[0].email;
        this.yearinfo=`${res.data[0].year}年 - `;
        res.data[0].sex!=0?this.sexinfo='Boy':this.sexinfo='Girl';
      })
    },

    // 2.编辑
    compileHandler(){
      this.isDisabled=false;
      this.year=0;
      this.sex=0;
    },

    // 3.取消
    cancelHandler(){
      this.isDisabled=true;
      this.userinfo(this.uname);
    },

    // 4.验证邮箱
    isEmail(){
      let reg=/^([a-zA-Z0-9]{6,16})@[a-z]{2,5}.(com|cn)+$/g;
      if(reg.test(this.email)){
        this.axios.get('/user/email',{params:{
          email:this.email
        }}).then(res=>{
          this.info=res.data;
        })
      }else{
        this.info='邮箱格式不正确！'
      }
    },

    // 5.保存
    saveHandler(){
      this.isDisabled=true;
      if(this.info!='邮箱格式不正确！' && this.info!='邮箱已被占用'){
        if(this.year!='' && this.sex!=''){
          this.axios.post('/user/update',
          qs.stringify({
            uname:this.uname,
            email:this.email,
            year:this.year,
            sex:this.sex!='Boy'?this.sexinfo=0:this.sexinfo=1
          })).then(res=>{
            this.msgAlert=true;
            this.message='修改成功';
            this.info='';
            this.yearinfo=`${this.year}年 - `;
            this.sexinfo=this.sex;
            setTimeout(()=>{
              this.msgAlert=false;
            },1500)
          })
        }else{
          this.msgAlert=true;
          this.userinfo(this.uname);
          this.info='';
          this.message='请选择宝宝出生年份、性别';
          setTimeout(()=>{
            this.msgAlert=false;
          },2000)
        }
      }else{
        this.msgAlert=true;
        this.message='邮箱已被占用';
        this.info='';
        setTimeout(()=>{
          this.msgAlert=false;
        },1500)
      }
    },

    // 6.密码修改
    updatePwd(){
      this.oldPwd='';
      this.firstPwd='';
      this.secondPwd='';
      this.oldMsg='';
      this.msg='';
      this.pwdAlert=true;
    },
    closeHandler(){
      this.pwdAlert=false;
    },
    // 验证旧密码
    codePwd(){
      if(this.oldPwd){
        this.oldPwd!==this.upwd?this.oldMsg='密码不正确':this.oldMsg='密码正确';
      }else{
        this.oldMsg='密码不能为空'
      }
    },
    // 密码是否一致
    isPass(){
      let reg=/^[a-zA-Z0-9]{6,12}$/g;
      if(reg.test(this.firstPwd)){
        if(this.firstPwd!==this.secondPwd){
          this.msg='密码不一致';
        }else{
          this.msg='密码一致';
        }
      }else{
        this.msg='密码格式不正确';
      }
    },
    submit(){
      if(this.firstPwd==this.secondPwd && this.oldPwd==this.upwd){
        this.axios.post('/user/updatepwd',qs.stringify({
          uname:this.uname,
          upwd:this.secondPwd
        })).then(res=>{
          this.pwdAlert=false;
          this.msgAlert=true;
          this.message='密码修改成功';
          setTimeout(()=>{
            this.msgAlert=false;
          },1500)
        })
      }else{
        if(this.oldPwd===this.upwd){
          this.oldMsg='密码正确';
        }
        this.msg='请输入正确密码';
      }
    }
  },
  created(){
    this.userinfo(sessionStorage.uname);
  }
}
</script>

<style scoped>
.myinfo{
  width: 960px;
  text-align: left;
}
.myinfo>.top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #ccc;
  margin: 0 0 10px 0;
}
.myinfo>.top>div>span{
  color: #09F;
  cursor: pointer;
}
.myinfo>.top>div>span:first-child{
  margin-right: 20px;
}
.myinfo>ul.info>li{
  height: 50px;
  line-height: 50px;
}
.myinfo>ul.info>li>label{
  display: inline-block;
  width: 70px;
}
.myinfo>ul.info>li>input{
  border: 1px solid transparent;
  background-color: #fff;
  text-indent: .5em;
}
.myinfo>ul.info>li>input.active{
  width: 160px;
  height: 30px;
  border: 1px solid #ccc;
  text-indent: .5em;
}
.myinfo>ul.info>li>label+label{
  width: 100px;
  margin-left: 7px;
}
.myinfo>ul.info>li>span{
  margin-left: 7px;
}
.myinfo>ul.info>li>select{
  width: 200px;
  height: 36px;
  border: 1px solid #ccc;
  text-indent: .5em;
  outline: none;
}
.myinfo>ul.info>li>label+select{
  margin-right: 10px;
}
.myinfo>div.btns{
  margin: 40px 0;
  text-align: center;
}
.myinfo>div.btns>button{
  width: 100px;
  height: 40px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: .5s linear;
}
.myinfo>div.btns>button:last-child{
  margin-left: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
}
.myinfo>div.btns>button:first-child:hover{
  opacity: .7;
}
.myinfo>.foot{
  margin-top: 30px;
}
.myinfo>.foot>span{
  color: #09F;
  cursor: pointer;
}
.myinfo>ul.location{
  margin-top: 20px;
}
.myinfo>ul.location>li{
  display: flex;
  justify-content: space-between;
}
.myinfo>ul.location>li>div>img{
  width: 36px;
  height: 36px;
  margin-left: 10px;
  vertical-align: middle;
}
.myinfo>ul.location>li>div:last-child>span:first-child{
  color: #09F;
}
.myinfo>ul.location>li>div:last-child>span:last-child{
  color: #f00;
  margin-left: 16px;
}
.myinfo>ul.location>li>div:last-child>span{
  cursor: pointer;
}

/* 弹窗提示 start*/ 
.myinfo>.content>.bgc{
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
.myinfo>.content>.alert{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:9999;
  margin: auto;
  width: 320px;
  opacity: 1;
}
.myinfo>.content>.alert>p{
  background-color: #000;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
  text-indent: 1em;
  color: #fff;
  border-radius: 8px 8px 0 0;
}
.myinfo>.content>.alert>h3{
  background: #fff;
  line-height: 120px;
  text-align: center;
  border-radius: 0 0 8px 8px;
}
/* 弹窗提示 end*/ 

/* 密码弹窗 start */
.myinfo>.pwd>.alert{
  width: 400px;
  background-color: #fff;
}
.myinfo>.pwd>.alert>h4{
  width: 160px;
  margin: 10px auto 20px;
  text-align: center;
  border-bottom: 1px solid #333;
  line-height: 30px;
}
.myinfo>.pwd>.alert>ul>li{
  line-height: 50px;
}
.myinfo>.pwd>.alert>ul>li>label{
  float: left;
  text-align: right;
  width: 80px;
}
.myinfo>.pwd>.alert>ul>li>input{
  width: 200px;
  height: 32px;
  margin-right: 10px;
  border: 1px solid #ccc;
  text-indent: .5em;
}
.myinfo>.pwd>.alert>div.btns{
  margin: 20px 0;
  text-align: center;
}
.myinfo>.pwd>.alert>div.btns>button{
  width: 100px;
  height: 40px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: .5s linear;
}
.myinfo>.pwd>.alert>div.btns>button:last-child{
  margin-left: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
}
.myinfo>.pwd>.alert>div.btns>button:first-child:hover{
  opacity: .7;
}
/* 密码弹窗 end */
</style>