<template>
	<div class="my-alert">
		<div class="container">
			<div class="content">
				<p>提示</p>
				<h3>{{ message }}</h3>
			</div>
			<div class="bgc"></div>
		</div>
	</div>
</template>

<script>
export default {
  name:'my-alert',
	props:{
		message:{
			type:String,
			default:''
		}
	}
}
</script>

<style scoped>
.my-alert>.container>.bgc{
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
  opacity: .6;
}
.my-alert>.container>.content{
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  z-index:9999;
  margin: auto;
  width: 280px;
  opacity: 1;
}
.my-alert>.container>.content>p{
  background-color: #000;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
  text-indent: 1em;
  color: #fff;
  border-radius: 8px 8px 0 0;
}
.my-alert>.container>.content>h3{
  background: #fff;
  line-height: 120px;
  text-align: center;
  border-radius: 0 0 8px 8px;
}
</style>