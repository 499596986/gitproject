<template>
  <div id="app">
  <div :class="{app:formflag}">
    <transition name="fade" mode="out-in">
        <router-view/>
    </transition>
  </div>

  <transition name="slide-up">
       <fromcon v-if="formflag"></fromcon>
   </transition> 
  </div>
</template>

<script>
import "../static/js/sizechange.js";
import "../static/css/style.css";
import  fromcon from "./components/form.vue";
import {mapState} from "vuex"

export default {
  name: 'App',
  mounted(){
  },
  mounted(){
    
  },
  computed:{
      ...mapState({
        formflag:state=>state.formflag
      })
  },
  watch:{
     '$route':function(to,from){
      /*  console.log("tui")
         setTimeout(function(){*/
           /*   document.body.scrollTop =0;
           document.documentElement.scrollTop = 0; */
    /*  })*/
  　　　　　
       }
   },
  methods:{
    
  },
  components:{
    fromcon
  }
}
</script>


<style lang="less">
.test{
  background:red;
}
.app{
  position:fixed;
  top:0px;
  bottom:0px;
  left:0px;
  right:0px;
  overflow:hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:#4c4c4c;
}
a{color:#4c4c4c}


.fade-enter,.fade-leave-to{
  opacity:0
}
.fade-enter-active,.fade-leave-active{        //这边的时间很重要 0.1s切换快点
  transition:opacity 0.2s;
}


.slide-left-enter,.slide-right-leave-active{
   transform:translateX(100%);
   -webkit-transform:translateX(100%);
   opacity:0;
}
.slide-left-leave-active,.slide-right-enter{
  opacity:0;
  transform:translateX(-30px);
  -webkit-transform:translateX(-30px);
}
.slide-left-enter-active,.slide-left-leave-active{
  -webkit-transition:all 0.3s ease;
  transition:all 0.3s ease;
}



.slide-up-enter,.slide-up-leave-active{
  transform:translateY(100%);
  opacity:0;
}
.slide-up-enter-active,.slide-up-leave-active{
  transition:all 0.3s;
}



@bgEFEFEF :#EFEFEF;
.bx-list{
  padding-bottom:0.25rem;
  padding-top:0.25rem;
  border-bottom:1px solid @bgEFEFEF;
  display:block;
  >img{
    width:30%;
  }
  .bx-list-right{
    width:65%;
    float:right;
    h3{
      color:#000;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow:hidden;
    }
    p{
      color:#666;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow:hidden;
      font-size:12px;
      margin-top:0.15rem;
    }
    span{
      display:inline-block;
      margin-top:0.2rem;
      padding:2px 5px;
      border:1px solid #448EF6;
      color:#448EF6;
      border-radius:3px;
      float:right;
      font-size:12px;
    }
  }
}
.bxnews{
  border-top:0.2rem solid @bgEFEFEF;
  .bx-list-right p{
    display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      white-space:normal;
  }
  .bx-list:last-child{
    border-bottom:0px;
  }
}


</style>
