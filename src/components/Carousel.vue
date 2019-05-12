<template>
  <div class="carousel">
    <el-carousel :interval='3000' type='card'>
      <el-carousel-item v-for='(item,index) in carousel' :key="index">
        <img :src="item.img" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        
      }
    },
    props:['carousel']
  }
</script>

<style scoped>

</style>