<template>
  <div class="gift">
    <ul>
      <li>
        <button @click="btnHandler" :class="{active:isActive}">优惠券</button>
        <button @click="btnHandler" :class="{active:!isActive}">礼品卡</button>
      </li>
    </ul>
    <ul>
      <li>
        <input type="text" :placeholder="text">
        <button>兑换优惠券</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isActive:true,
      text:'请输入代金券号码'
    }
  },
  methods:{
    btnHandler(){
      this.isActive=!this.isActive;
      this.isActive?this.text='请输入代金券号码':this.text='请输入礼品卡号码';
    }
  }
}
</script>

<style scoped>
.gift>ul>li>button:nth-child(2){
  margin-left: 3px;
}
.gift>ul:first-child{
  margin-bottom: 10px;
}
.gift>ul:first-child>li>button{
  width: 50px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  transition: .5s linear;
}
.gift>ul:first-child>li>button:hover{
  opacity: .7;
}
.gift>ul:first-child>li>button.active{
  border: 1px solid #333;
  background-color: #333;
  color: #fff;
}
.gift>ul:last-child>li>input{
  width: 160px;
  height: 26px;
  text-indent: .5em;
}
.gift>ul:last-child>li>button{
  width: 80px;
  height: 32px;;
  border: none;
  background-color: #333;
  color: #fff;
  transition: .5s linear;
}
.gift>ul:last-child>li>button:hover{
  opacity: .7;
}
.gift>ul>li>button{
  cursor: pointer;
}
</style>