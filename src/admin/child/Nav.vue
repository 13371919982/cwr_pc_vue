<template>
  <div class="nav">
    <div class="content">
      <i class="el-icon-caret-left"></i>
      <div class="right">
        <div><i class="el-icon-message"></i></div>
        <div>
          <img src="../../../public/img/user.png" alt="">
          <h3>超级管理员<i class="el-icon-arrow-down"></i></h3>
          <div class="dropmenu">
            <p>基本信息</p>
            <p>用户设置</p>
            <p>使用说明</p>
            <p>退出登录<i class="el-icon-error"></i></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

}

</script>

<style scoped>
.nav>.content{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 60px;
  background-color: #333;
  color: #fff;
}
.nav>.content>.el-icon-caret-left{
  font-size: 30px;
  margin-left: 16px;
}
.nav>.content>.right{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav>.content>.right .el-icon-message{
  font-size: 20px;
  line-height: 60px;
  padding: 0 16px;
  transition: .5s;
  box-sizing: border-box;
}
.nav>.content>.right>div:last-child{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  height: 60px;
  padding: 0 16px;
  transition: .5s;
}
.nav>.content>.right>div:last-child>img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.nav>.content>.right .el-icon-message:hover{
  background-color: #fff;
  color: #000;
}
.nav>.content>.right>div:last-child>.dropmenu{
  position: absolute;
  top: 60px;
  right: 0;
  width: 200px;
  height: 0px;
  color: #000;
  text-align: left;
  text-indent: 2em;
  box-shadow: 0 10px 5px rgba(0,0,0,0.15);
  transition: .5s;
  background-color: #fff;
  overflow: hidden;
}
.nav>.content>.right>div:last-child>.dropmenu>p{
  width: 100;
  line-height: 40px;
  color: #000;
  cursor: pointer;
}
.nav>.content>.right>div:last-child>.dropmenu>p>.el-icon-error{
  float: right;
  margin-right: 20px;
  line-height: 40px;
  font-size: 14px;
  color: red;
}
.nav>.content>.right>div:last-child:hover{
  background-color: #fff;
  color: #000;
}
.nav>.content>.right>div:last-child>.dropmenu>p:hover{
  opacity: 0.7;
}
.nav>.content>.right>div:last-child:hover .dropmenu{
  height: 160px;
}
</style>