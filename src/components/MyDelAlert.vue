<template>
	<div class="my-del-alert">
		<div class="container">
			<div class="content">
				<h3>Delete this item</h3>
				<p>{{ msg }}</p>
				<div class="btns">
					<button @click="delHandler">Y e s</button>
					<button @click="closeHandler">N o</button>
				</div>
			</div>
			<div class="bgc"></div>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		msg:{
			type:String,
			default:''
		},
		delAlert:{
			type:Boolean,
			default:false
		},
		closeHandler:{
			type:Function
    },
    delHandler:{
      type:Function
    }
	},
	data(){
		return {
		}
	},
}
</script>

<style scoped>
.my-del-alert>.container>.bgc{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
}
.my-del-alert>.container>.content{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:9999;
  margin: auto;
  width: 420px;
  background-color: #fff;
  text-align: center;
  opacity: 1;
}
.my-del-alert>.container>.content>h3{
  width: 160px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
}
.my-del-alert>.container>.content>p{
  line-height: 50px;
}
.my-del-alert>.container>.content>.btns{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 70px;
  margin: 0 auto;
}
.my-del-alert>.container>.content>.btns>button{
  width: 80px;
  height: 30px;
  background-color: #333;
  border: 0;
  color: #fff;
  transition: .5s linear;
  cursor: pointer;
}
.my-del-alert>.container>.content>.btns>button:last-child{
  background-color: #fff;
  color: #333;
  border:1px solid #ccc;
}
.my-del-alert>.container>.content>.btns>button:hover{
  opacity: .7;
}
.my-del-alert>.container{
  border-left: none;
}
.my-del-alert>h1{
  opacity: 0.5;
  font-size: 26px;
  line-height: 300px;
}
</style>