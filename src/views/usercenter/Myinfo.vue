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
        <input :class="isEmail?'':'active'" type="text" v-model="email" :disabled='isEmail'>
        <span>{{ info }}</span>
      </li>
      <li> 
        <label for="">您的宝宝：</label>
        <label v-show="isDisabled">
          <span>{{ yearinfo }} {{ sexinfo }}</span>
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
    <my-button 
      v-show='!isDisabled'
      :valFirst='valFirst'
      :valSecond='valSecond'
      :submit='saveHandler'
      :disabled='codeEmail'
      :cancel='cancel'
      :code='codeEmail'
    />
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
    <my-alert
      v-show="msgAlert"
      :message='message'
    />
    <!-- 密码修改弹窗 -->
    <div class="pwd" v-show="pwdAlert">
      <div class="alert">
        <h4>修改密码</h4>
        <ul>
          <li>
            <label>旧密码：</label>
            <input type="password" v-model="oldPwd">
            <span>{{ oldMsg }}</span>
          </li>
          <li>
            <label>新密码：</label>
            <input type="password" v-model="firstPwd" placeholder="长度6-12位，字母和数字组成">
            <span>{{ msg }}</span>
          </li>
          <li>
            <label>确认密码：</label>
            <input type="password" v-model="secondPwd" placeholder="长度6-12位，字母和数字组成">
            <span>{{ msg }}</span>
          </li>
        </ul>
        <p>{{ err }}</p>
        <my-button 
          :valFirst='valFirst'
          :valSecond='valSecond'
          :submit='submit'
          :disabled='codePwd'
          :cancel='close'
          :code='codePwd'
        />
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
      isEmail:true,
      msgAlert:false,
      valFirst:'保存',
      valSecond:'取消',
      message:'',
      info:'',
      pwdAlert:false,
      oldPwd:'',
      firstPwd:'',
      secondPwd:'',
      oldMsg:'',
      msg:'',
      err:''
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
        this.yearinfo=res.data[0].year;
        !res.data[0].sex && res.data[0].sex!=null?(res.data[0].sex!=0?this.sexinfo='Boy':this.sexinfo='Girl'):this.sexinfo='';
      })
    },

    // 2.编辑
    compileHandler(){
      this.isDisabled=false;
      if(this.email){
        this.isEmail=true;
      }else{
        this.isEmail=false;
      }
      this.year=0;
      this.sex=0;
    },

    // 3.取消
    cancel(){
      this.isDisabled=true;
      this.isEmail=true;
      this.info='';
      this.userinfo(this.uname);
    },

    // 4.保存
    // 邮箱代码重用封装
    emailHanlder(){
      this.axios.post('/user/update',
        qs.stringify({
          uname:this.uname,
          email:this.email,
          year:this.year,
          sex:this.sex!='Boy'?this.sexinfo=0:this.sexinfo=1
      })).then(res=>{
        this.msgAlert=true;
        this.message='修改成功';
        this.isEmail=true;
        this.isDisabled=true;
        this.info='';
        this.yearinfo=this.year;
        this.sexinfo=this.sex;
        setTimeout(()=>{
          this.msgAlert=false;
        },1500)
      })
    },
    saveHandler(){
      // 正则
      let reg=/^([a-zA-Z0-9]{6,16})@[a-z]{2,5}.(com|cn)+$/g;
      // 如果邮箱不为空直接跳过验证
      if(this.isEmail){
        this.emailHanlder();
      }else{
        // 先验证邮箱格式是否符合格式
        if(reg.test(this.email)){
          this.info='';
          // 再查询邮箱是否被占用
          this.axios.get('/user/email',{params:{
            email:this.email
          }}).then(res=>{
            // 如果查询结果为0 未被占用
            if(res.data.length<=0){
              this.emailHanlder();
            }else{
              this.info='邮箱已被占用'
            }
          })
        }else{
          this.info='邮箱格式不正确';
        }
      }
    },

    // 5.修改密码
    updatePwd(){
      this.oldPwd='';
      this.firstPwd='';
      this.secondPwd='';
      this.oldMsg='';
      this.msg='';
      this.pwdAlert=true;
      this.valFirst='提交';
    },
    close(){
      this.pwdAlert=false;
    },
    // 提交
    submit(){
      // 正则
      let reg=/^[a-zA-Z0-9]{6,12}$/g;
      // 先验证旧密码是否正确
      if(this.oldPwd===this.upwd){
        this.oldMsg='';
        // 再验证新旧密码是否一致
        if(this.oldPwd!==this.secondPwd){
          // 再验证新密码是否符合匹配的正则
          if(reg.test(this.firstPwd)){
            // 最后验证两个密码是否一致
            if(this.firstPwd===this.secondPwd){
              this.msg='';
              this.axios.post('/user/updatepwd',qs.stringify({
                uname:this.uname,
                upwd:this.secondPwd
              })).then(res=>{
                this.pwdAlert=false;
                this.msgAlert=true;
                this.message='修改成功';
                setTimeout(()=>{
                  this.msgAlert=false;
                },1500)
              })
            }else{
              this.msg='密码不一致'
            }
          }else{
            this.msg='密码格式不正确';
          }
        }else{
          this.err='新旧密码不能相同，请更换新密码'
        }
      }else{
        this.oldMsg='密码不正确'
      }
    },
  },
  created(){
    this.userinfo(sessionStorage['uname']);
  },
  computed:{
    // 1.邮箱非空验证和宝宝非选
    codeEmail(){
      return !this.email || this.year==0 || this.sex==0;
    },

    // 2.密码非空验证
    codePwd(){
      return !this.oldPwd || !this.firstPwd || !this.secondPwd;
    }
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

/* 密码修改弹窗 start */
.myinfo>.pwd>.bgc{
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
  opacity: .6;
}
.myinfo>.pwd>.alert{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:9999;
  width: 400px;
  margin: auto;
  background-color: #fff;
  opacity: 1;
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
.myinfo>.pwd>.alert>p{
  margin-top: 10px;
  color: red;
  text-align: center;
}
/* 密码修改弹窗 end */
</style>