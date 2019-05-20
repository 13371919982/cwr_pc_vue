<template>
  <div class="carousel">
    <el-carousel :interval='3000' type='card'>
      <el-carousel-item v-for='(item,index) of carousel' :key="index">
        <router-link :to="{name:'product',params:{kind:'女士'}}">
          <img :src="item.img" alt="">
        </router-link>
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