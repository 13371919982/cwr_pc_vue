<template>
  <div class="my-button">
    <div class="container">
      <input type="button" @click="submit" v-model="valFirst" :disabled='disabled' :class="code?'active':''">
      <input type="button" @click="cancel" v-model="valSecond">
    </div>
  </div>
</template>

<script>
export default {
  name:'my-button',
  props:{
    valFirst:{
      type:String,
      default:''
    },
    valSecond:{
      type:String,
      default:''
    },
    disabled:{
      type:Boolean,
      default:false
    },
    code:{
      type:Boolean,
      default:false
    },
    submit:{
      type:Function,
    },
    cancel:{
      type:Function,
    }
  }
}
</script>

<style scoped>
.my-button>.container{
  margin: 40px 0;
  text-align: center;
}
.my-button>.container>input{
  width: 100px;
  height: 40px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: .5s linear;
}
.my-button>.container>input:first-child.active{
  opacity: .5;
}
.my-button>.container>input:last-child{
  margin-left: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
}
.my-button>.container>input:first-child:hover{
  opacity: .5;
}
</style>