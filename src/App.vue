<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components:{
    Header,
    Footer
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* 样式初始化 */
body,dl,dd,ul,ol,h1,h2,h3,h4,h5,h6,p,form,header,section,article,footer{margin:0;padding:0;}
body,button,input,select,textarea{font:12px/1.5 tahoma,'\5FAE\8F6F\96C5\9ED1',sans-serif}
/* h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;} */
em{font-style:normal;}
a{text-decoration:none;color:black;}
img{border:0;} 
ul{list-style:none;}
button,input{font-size:100%;outline:none;}
table{border-collapse:collapse;border-spacing:0;}
td,th,ul{padding:0;}

</style>
