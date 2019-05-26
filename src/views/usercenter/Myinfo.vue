<template>
  <div class="myinfo">
    <div class="top">
      <h3>个人资料</h3>
      <div>
        <span @click="compileHandler">编辑</span>
        <span>修改密码</span>
      </div>
    </div>
    <ul class="info">
      <li>
        <label for="">用 户 名： </label>
        <input :class="!isDisabled?'active':''" type="text" value="13371919982" :disabled='isDisabled'></li>
      <li>
        <label for="">邮 箱：  </label>
        <input :class="!isDisabled?'active':''" type="text" value="690245843@qq.com" :disabled='isDisabled'></li>
      <li>
        <label for="">手 机： </label><span>13371919982</span>
      </li>
      <li> 
        <label for="">您 的 宝 宝： </label>
        <select name="" id="" v-show="!isDisabled">
          <option value="">请选择年份</option>
          <option  v-for="(item,index) of years" :key="index" value="">{{ item }}</option>
        </select>
        <select name="" id="" v-show="!isDisabled">
          <option value="">请选择宝宝性别</option>
          <option v-for="(item,index) of sex" :key="index" value="">{{ item }}</option>
        </select>
      </li>
    </ul>
    <div class="btns" v-show="!isDisabled">
      <button>保存</button>
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
  </div>
</template>

<script>
export default {
  data(){
    return{
      years:['2019','2018','2017','2016','2015','2014','2013','2012','2011','2010'],
      sex:['Boy','Girl'],
      isDisabled:true,
    }
  },
  methods:{
    // 1.编辑
    compileHandler(){
      this.isDisabled=false;
    },
    // 2.取消
    cancelHandler(){
      this.isDisabled=true;
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
.myinfo>ul.info>li>span{
  margin-left: 5px;
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
}
.myinfo>div.btns>button:last-child{
  margin-left: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
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
</style>