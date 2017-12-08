<template>
  <div id="app">
    <header class="header">
        <span class="fa "  :class='{"fa-reorder":headerback }'  v-on:click="menuisopen"></span>
        <span class="fa" :class='{"fa-angle-left":!headerback}' v-on:click="goback"></span>
    </header>
    <div :class="{loading:loadanimate}">
          <span class="left"></span>
          <span class="middle"></span>
          <span class="right"></span>
    </div>

    <menus ref="menuchild" v-on:nothidden="nohidden" ></menus>
    <div class="changerouter" :class="{ishidden:ishidden}" >
        <transition :name="transitionname">
            <keep-alive> 
                  <router-view></router-view>
            </keep-alive>
        </transition>
    </div>

  </div>
</template>

<script>
//import Vue from "vue"
import "./assets/js/sizechange.js"  
import "./assets/css/style.css"
import "./assets/css/font-awesome.css"  //字体图标


import Swiper from "../static/swiper.js"   //作为全局的swiper
import "../static/swiper.css"
import $ from "jquery"

import menus from "./components/com/menu.vue"


export default {
  name: 'app',
  components:{ menus },
  data(){
    return {
       ishidden:0,  
       headerback:true,
       loadanimate:true,
       transitionname:"slide-left"
    }
  },
  mounted(){
  },
  methods:{
    menuisopen(){
      this.$refs.menuchild.menuisopen=1;
      this.ishidden=1;
    },
    nohidden(){
      this.ishidden=0;
    },
    goback(){
      //this.$router.go(-1);
      window.history.back();
    }
  },
  watch:{
      '$route'(to,from){
          const toDepth=to.path.split("/").length;
          const fromDepth=from.path.split("/").length;
          this.transitionname=toDepth<fromDepth?"slide-right":"slide-left";
          if(to.path.indexOf("/detail/add/")!=-1){
             this.headerback=false;
          }else{
            this.headerback=true;
          }
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
  z-index:3;

}



.home-text{
  position:relative;
  padding:0px 0.3rem;
  z-index:2;
  background:#fff;
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
  position:relative;
  top:-0.32rem;
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
  -webkit-flex:1;
  flex:1;
}



.changerouter{
  position:absolute;
  top:0px;
  bottom:0px;
  left:0px;
  right:0px;
  overflow:auto;
}
.ishidden{
  overflow:hidden;
}




.slide-left-enter, .slide-right-leave-active {
  -webkit-transform:translateX(100%);
  transform:translateX(100%);
  opacity:0;
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}

.slide-left-enter-active,.slide-right-enter-active {
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}
.slide-left-leave-active,.slide-right-leave-active {
 /*   -webkit-transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
     -webkit-transition: all .3s ease;
    transition: all .3s ease;
}



/***加载动画**/
.loading {
    width: 25%;
    height: 0.4rem;
    margin: 25% auto 0;
    position: relative;
}
.loading span {
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    position: absolute;
    background: #5B7492;
    transform: translate(-50%, 0);
}
.loading .left {
    background: #FFD300;
    animation: lMove 2.5s ease infinite;
}
.loading .middle {
    left: 50%;
    animation: mMove 2.5s ease infinite;
}
.loading .right {
    left: 100%;
    background: #acb9c8;
    animation: rMove 2.5s ease infinite;
}


@keyframes lMove{
  0% {
      left: 0;
  }
  25% {
      left: 50%;
      background: #FFD300;
  }
  50% {
      left: 100%;
      background: #5B7492;
  }
  75% {
      left: 50%;
      background: #acb9c8;
  }
  100% {
      left: 0;
}
}


@keyframes mMove {
  25% {
      background: #5B7492;
  }
  50% {
      background: #FFD300;
  }
  75% {
      background: #5B7492;
  }
}

@keyframes rMove {
  0% {
      left: 100%;
  }
  25% {
      left: 50%;
  }
  50% {
      left: 0;
      background: #acb9c8;
  }
  75% {
      left: 50%;
      background: #FFD300;
  }
  100% {
      left: 100%;
  }
}

</style>
