<template>
  <div class="my-count">
    <div class="left">
      <button class="add" @click="min">－</button>
      <input type="text" v-model='count' @keyup="fixNum" disabled>
      <button class="add" @click="max">＋</button>
    </div>
  </div>
</template>

<script>
  export default {
    name:'my-count',
    props:{
      count:{
        type:Number,
      },
      min:{
        type:Function
      },
      max:{
        type:Function
      },
      fixNum:{
        type:Function
      }
    },
    data(){
      return{
      }
    }
  }
</script>

<style scoped>
.my-count>.left>.add{
  width: 46px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.my-count>.left>input{
  width: 46px;
  height: 24px;
  text-align: center;
}
</style>