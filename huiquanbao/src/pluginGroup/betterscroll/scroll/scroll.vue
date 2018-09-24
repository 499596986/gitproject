<template>
  <div ref="wrapper" class="list-wrapper" >
    <div class="scroll-content" ref="scrollContent">
      <div ref="listWrapper" class="listWrapper">
        <slot>
          <ul class="list-content">
            <li @click="clickItem($event,item)" class="list-item" v-for="item in data">{{item}}</li>
          </ul>
        </slot>
      </div>

       <slot name="pullup"
            :pullUpLoad="pullUpLoad"
            :isPullUpLoad="isPullUpLoad"
      >
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>  

    </div>
  

    
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else><span>{{refreshTxt}}</span></div>
        </div>
      </div>
    </slot>

  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Loading from '../loading/loading.vue'
  import Bubble from '../bubble/bubble.vue'
  import { getRect } from '../dom/dom.js'

  const COMPONENT_NAME = 'scroll'
  const DIRECTION_H = 'DIRECTION_H'
  const DIRECTION_V = 'DIRECTION_V'

  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: null,
        default: function () {
          return []
        }
      },
      probeType: {  //1(非试试派发scroll事件) 2(实时派发scoll事件) 3(实时,会一直派发scroll)
        type: Number,
        default: 1
      },
      click: {          //默认 click事件有效
        type: Boolean,
        default: true
      },
      tap:{             //默认  tab事件有效
        type:Boolean,
        default:true
      },
      listenScroll: {       //监听滚动,默认不监听,要监听则probeType设置为3比较好
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      direction: {            //默认竖向滚动
        type: String,
        default: DIRECTION_V
      },
      scrollbar: {          //是否会有 滚动条,true(有滚动条),默认 没有滚动条
        type: null,
        default: false
      },
      pullDownRefresh: {    //true开启下拉刷新,默认不开启
        type: null,
        default: false
      },
      pullUpLoad: {         //true开启上拉加载,默认不开启
        type: null,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      freeScroll: {     //为true时 x轴和y轴方向都可以滚动,
        type: Boolean,
        default: false
      },
      mouseWheel: {     //true开启 pc端的鼠标滚动, false不开启,默认鼠标滚动有效
        type: Boolean,
        default: true
      },
      startX:{      //初始横轴初始化位置,X轴初始位置
        type:Number,
        default:0
      },
      startY:{      //初始化纵轴初始化位置,Y轴初始位置
        type:Number,
        default:0
      }
    },
    data() {
      return {
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: '',
        bubbleY: 0
      }
    },
    computed: {
      pullUpTxt() {
        const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || "加载中..."

        const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || "没有更多数据..."

        return this.pullUpDirty ? moreTxt : noMoreTxt
      },
      refreshTxt() {
        return this.pullDownRefresh && this.pullDownRefresh.txt || "刷新成功"
      }
    },
    created() {
      this.pullDownInitTop = -50;
    },
    mounted() {
      setTimeout(() => {
        this.initScroll()
      }, 20)
    },
    methods: {
      initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        if(this.direction=="DIRECTION_H"){  //横向滚动
           this.horizontalWid();    
        }
   
        let options = {
          probeType: this.probeType,
          click: this.click,
          tap:this.tap,
          scrollY: this.freeScroll || this.direction === DIRECTION_V,
          scrollX: this.freeScroll || this.direction === DIRECTION_H,
          scrollbar: this.scrollbar,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          startY: this.startY,
          freeScroll: this.freeScroll,
          mouseWheel: this.mouseWheel,  //是否开启鼠标滚动,默认开启了
          startX:this.startX,   //初始化向X轴移动的位置
          startY:this.startY,   //初始化向y轴移动的位置
           bounce: false,
        }



        this.scroll = new BScroll(this.$refs.wrapper, options)
        if (this.listenScroll) {                //监听滚动
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        if (this.listenBeforeScroll) {        //滚动之前
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScrollStart')
          })
        }

        if (this.pullDownRefresh) {   //下拉刷新
          this._initPullDownRefresh()
        }

        if (this.pullUpLoad) {          //上拉加载
          this._initPullUpLoad()
        }
      },
      horizontalWid(){      //横向滚动时,给第二个盒子加上宽度,才能滚动
        var el=document.querySelectorAll(".listWrapper .scroll-horizontal");
        var elLen=el.length;
        var width=0;
        for(var i=0;i<elLen;i++){
           width+=getRect(el[i]).width;
        }
        this.$refs.scrollContent.style.width=width+"px";
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {    //参数(x,y,time),其中x,y表示x和y轴的距离
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {  //滚动到元素(el,time,offsetX,offsetY)
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      clickItem(e, item) {
        console.log(e)
        this.$emit('click', item)
      },
      destroy() {
        this.scroll.destroy()
      },
      forceUpdate(dirty) {
        if (this.pullDownRefresh && this.isPullingDown) { //下拉开启,且正在下拉刷新中
          this.isPullingDown = false
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) { //上拉开启且正在上拉刷新中
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = dirty
          this.refresh()
        } else {
          this.refresh()
        }
      },
      _initPullDownRefresh() {           //下拉刷新结束,可以请求后端数据了
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false
          this.isPullingDown = true
          this.$emit('pullingDown')
        })

        this.scroll.on('scroll', (pos) => {
          if (!this.pullDownRefresh) {
            return
          }
          if (this.beforePullDown) {
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`        
          } else {
            this.bubbleY = 0
          }

          if (this.isRebounding) {
            this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`;
          }
        })
      },
      _initPullUpLoad() {     // 上拉加载结束,可以请求后端数据了
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true
          this.$emit('pullingUp')
        })
      },
      _reboundPullDown() {
        const {stopTime = 600} = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            resolve()
          }, stopTime)
        })
      },
      _afterPullDown() {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          this.beforePullDown = true
          this.isRebounding = false
          this.refresh()
        }, this.scroll.options.bounceTime)
      }
    },
    watch: {
      data() { 
        var that=this;
        this.$nextTick(function(){
          if(that.direction=="DIRECTION_H"){ //横向滚动在计算宽度
            this.horizontalWid();
          }
          this.forceUpdate(true)
        })
      }
    },
    components: {
      Loading,
      Bubble
    }
  }

</script>

<style scoped>
  .list-wrapper{
    position: relative;
    height: 100%;
  } 
  .list-wrapper  .scroll-content{
     position: relative;
      z-index: 1;
  }
  .list-wrapper  .scroll-content  .list-content{
     position: relative;
      z-index: 10;
  }
  .list-wrapper  .scroll-content  .list-content .list-item{
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      padding-left: 20px;
      border-bottom: 1px solid #e5e5e5;
  }
    

  .pulldown-wrapper{
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content:center;
    align-items:center;
    transition: all;
  }
    
  .pulldown-wrapper  .after-trigger{
      margin-top: 10px 
  }
  .pullup-wrapper{
    width: 100%;
    display:flex;
    justify-content:center;
    align-items:center;
    padding: 16px 0;
  }
    
</style>
