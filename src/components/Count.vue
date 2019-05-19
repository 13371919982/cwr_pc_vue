<template>
  <div class="count">
    <div class="left">
      <button class="add" @click="min">－</button>
      <input type="text" v-model='n' @keyup="fixNum">
      <button class="add" @click="max">＋</button>
    </div>
  </div>
</template>

<script>
  export default {
    props:['count'],
    data(){
      return{
        n:this.count
      }
    },
    methods:{
      fixNum(){
        let fix;
        if(typeof this.n==='string')
          fix=Number(this.n.replace(/\D/g,''));
        else
          fix=this.n;
        if(fix>5 || fix<1)
          fix=1;
        this.n=fix
      },
      min(){
        if(this.n<=1) return;
        this.n--; 
      },
      max(){
        if(this.n>=5) return;
        this.n++;
      },
    }
  }
</script>

<style scoped>
.count>.left>.add{
  width: 46px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.count>.left>input{
  width: 46px;
  height: 24px;
  text-align: center;
}
</style>