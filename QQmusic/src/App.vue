<template>
  <div id="app">

      <router-view/>

      <player></player>
  </div>
</template>




<script>

import "../static/js/sizechange.js";
import "../static/css/style.css";
import "../static/css/font-awesome.min.css";
import Swiper from "swiper/dist/js/swiper.js";
import "swiper/dist/css/swiper.css";



import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);


import player from "./components/player.vue";
export default {
  name: 'App',

  components:{
    player
  }
}
</script>

<style>
body{
  background:#222;
}
.topbottom{
  position:fixed;
  top:1.8rem;
  bottom:0px;
  left:0px;
  right:0px;
  width:7.5rem;
  z-index:3;
  overflow:hidden;
}
.fullcover{
  position:fixed;
  top:0px;
  bottom:0px;
  left:0px;
  right:0px;
  z-index:4;
}



.slide-left-enter,.slide-right-leave-active{
   transform:translate(100%);
   -webkit-transform:translate(100%);
   -ms-transform:translate(100%);
   opacity:0;
}
.slide-left-enter-active,.slide-right-enter-active{
   transition:all 0.3s ease;
}
.slide-left-leave-active,.slide-right-enter{
  transition:translate(-100%);
  -webkit-transform:translate(-100%);
  opacity:0;
}
.slide-left-leave-active,.slide-right-leave-active{
  transition:all 0.3s ease;
}



.player{
  position:fixed;
  bottom:0px;
  left:0px;
  right:0px;
  padding:0.2rem 0.3rem;
  background:#333333;
  align-items: center;
  z-index:3;
}
.player-lef{
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right:0.3rem;
 
}
@keyframes xunhuan{
  0%{
     transform:rotate(0deg);
  }
  100%{
    transform:rotate(360deg);
  }
}
.player-lef.noactive{ 
   animation: xunhuan 5s linear infinite;
   -webkit-animation: xunhuan 5s linear infinite;
}
.player-mid{
  flex:1;
  -webkit-flex:1;
   line-height:0.45rem;
   font-size:0.3rem;
   color:#666;
}
.player-mid p{
   width:3.8rem;
   text-overflow:ellipsis;
   overflow:hidden;
   white-space:nowrap;
}
.player-mid p.f{
  font-size:0.34rem;
  color:#fff;
}

.player-rig{
  color:yellow;
  font-size:0rem;
}
.player-rig span{
  width:0.8rem;
  font-size:0.6rem;
  margin-left:0.2rem;
  height:0.8rem;
  line-height:0.8rem;
  text-align:center;
}

.screenStatusF-enter,.screenStatusF-leave-active{
   width:0.8rem;
   height:0.8rem;
   border-radius:50%;
   bottom:1rem;
   opacity:0;
   top:100%;
   left:0.25rem;
   overflow:hidden;
}
.screenStatusF-enter-active,.screenStatusF-leave-active{
  transition:all 0.5s ease;
}
</style>
