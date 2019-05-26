<template>
  <div class="mycollection">
    <ul>
      <li>图片</li>
      <li>商品名称</li>
      <li>价格</li>
      <li>操作</li>
    </ul>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>删除收藏</li>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.mycollection{
  width: 960px;
}
.mycollection>ul{
  display: flex;
  align-items: center;
  border-bottom: 1px solid #333;
}
.mycollection>ul:first-child{
  height: 30px;
}
.mycollection>ul>li{
  width: 25%;
}
.mycollection>ul+ul{
  height: 80px;
}
</style>