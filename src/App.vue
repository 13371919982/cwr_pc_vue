<template>
  <div id="app">
    <Header />
    <!-- <transition name="fade"> -->
    <router-view/>
    <!-- </transition> -->
    <Footer/>
  </div>
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './assets/common.css'

export default {
  components:{
    Header,
    Footer
  }
}

</script>
