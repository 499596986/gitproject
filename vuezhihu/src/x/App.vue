<template>
  <div id="app">
    <header class="header">
        <span class="fa fa-reorder" v-on:click="menuisopen"></span>
    </header>
    <menus v-bind:menuopen="menuopen"></menus>
    <router-view></router-view>
  </div>
</template>

<script>
import "./assets/js/sizechange.js"  
import "./assets/css/style.css"
import "./assets/css/font-awesome.css"  //字体图标


import Swiper from "../static/swiper.js"   //作为全局的swiper
import "../static/swiper.css"

import menus from "./components/com/menu.vue"

export default {
  name: 'app',
  components:{ menus },
  data(){
    return {
        menuopen:0,
    }
  },
  mounted(){
  },
  methods:{
    menuisopen(){
      this.menuopen=1;
    }
  }
  
}
</script>

<style >
.header{
  height:1rem;
  line-height:0.9rem;
  font-size:0.5rem;
  padding:0px 0.3rem;
  color:#fff;
  background:linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.51) 95%);
  position:fixed;
  top:0px;
  left:0px;
  right:0px;
  z-index:2;

}



.home-text{
  position:relative;
  padding:0px 0.3rem;
  top:-0.32rem;
  z-index:2;
}
.home-list h2{
  width:50%;
  text-align:center;
  height:0.64rem;
  line-height:0.64rem;
  border-radius:30px;
  background:#FFD300;
  color:#fff;
  font-size:0.35rem;
  margin-bottom:0.3rem;
}
.home-list li{
  display:-webkit-flex;
  display:flex;
  padding:0.15rem 0.2rem;
  box-shadow:0 3px 10px 0 rgba(91, 115, 146, 0.15);
  margin-bottom:0.3rem;
  align-items:center;
  background:#fff;
  border-radius:5px;
}
.home-list li img{
  width:2rem;
  height:2rem;
  margin:0px 0.2rem 0px 0px;
}
.home-list li p{
  color:#5B7492;
  font-size:0.35rem;
  line-height:0.6rem;
}
</style>
