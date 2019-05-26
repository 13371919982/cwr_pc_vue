<template>
  <div class="myscore">
    <ul>
      <li>#</li>
      <li>日期</li>
      <li>积分</li>
      <li>剩余积分</li>
      <li>说明</li>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.myscore{
  width: 960px;
}
.myscore>ul{
  display: flex;
  
}
.myscore>ul>li{
  height: 36px;
  line-height: 36px;
  border: 1px solid #ccc;
}
.myscore>ul>li+li{
  border-left: none;
}
.myscore>ul>li:nth-child(1){
  width: 10%;
}
.myscore>ul>li:nth-child(2){
  width: 20%;
}
.myscore>ul>li:nth-child(3){
  width: 10%;
}
.myscore>ul>li:nth-child(4){
  width: 10%;
}
.myscore>ul>li:nth-child(5){
  width: 50%;
}
</style>