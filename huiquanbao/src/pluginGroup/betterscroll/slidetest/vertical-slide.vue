<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot>
      </slot>
    </div>

    <div v-if="showDot" class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script >
  import { addClass } from '../dom/dom.js'
  import BScroll from 'better-scroll'

  const COMPONENT_NAME = 'slide'

  export default {
    name: COMPONENT_NAME,
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      click: {
        type: Boolean,
        default: true
      },
      showDot: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      this.update()

      window.addEventListener('resize', () => {
        if (!this.slide || !this.slide.enabled) {
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if (this.slide.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    },
    activated() {
      if (!this.slide) {
        return
      }
      this.slide.enable()
      let pageIndex = this.slide.getCurrentPage().pageY
      this.slide.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    methods: {
      update() {
        if (this.slide) {
          this.slide.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh() {
        this._setSlideHeight(true)
        this.slide.refresh()
      },
      next() {
        this.slide.next()
      },
      init() {
        clearTimeout(this.timer)
        this.currentPageIndex = 0
        this._setSlideHeight()

        if (this.showDot) {
          this._initDots()
        }

        this._initSlide()

        if (this.autoPlay) {
          this._play()
        }
      },
      _setSlideHeight(isResize) {                 /**这很重要,高度设定**/
        this.children = this.$refs.slideGroup.children

        let height = 0
        let slideHeight = this.$refs.slide.clientHeight
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slide-item')

          child.style.height = slideHeight + 'px'
          height += slideHeight
        }
        if (this.loop && !isResize) {
          height += 2 * slideHeight
        }
        this.$refs.slideGroup.style.height = height + 'px'
      },
      _initSlide() {
        this.slide = new BScroll(this.$refs.slide, {
          scrollX: false,
          scrollY: true,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400,
           /* easing: {
              style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }*/
          },
          bounce: false,
          click: this.click
        })

        this.slide.on('scrollEnd', this._onScrollEnd)

        this.slide.on('touchEnd', () => {
          if (this.autoPlay) {
            this._play()
          }
        })

        this.slide.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd() {
        let pageIndex = this.slide.getCurrentPage().pageY
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
       _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slide.next()
        }, this.interval)
      }
    }
  }
</script>

<style scoped>
  .slide{
    width:100%;height:100%;
  } 
  
 

 .dots{
   position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;
}
.dots  .dot{
  display: inline-block;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background:rgba(255,255,255,0.5);
}
.dots  .dot.active{
  width: 20px;
  border-radius: 5px;
 background:rgba(255,255,255,0.8);
}   

</style>
