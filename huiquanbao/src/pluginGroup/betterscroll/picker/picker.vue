<template>
  <transition name="picker-fade">
    <div class="picker" v-show="state===1" @touchmove.prevent @click="cancel">
      <transition name="picker-move">
        <div class="picker-panel" v-show="state===1" @click.stop>


          <div class="picker-choose border-bottom-1px">
            <span class="cancel" @click="cancel">{{cancelTxt}}</span>
            <span class="confirm" @click="confirm">{{confirmTxt}}</span>
            <h1 class="picker-title" @click="scrollPlace(0,4)">{{title}}</h1>
          </div>


          <div class="picker-content">
            <div class="mask-top border-bottom-1px"></div>
            <div class="mask-bottom border-top-1px"></div>
            <div class="wheel-wrapper" ref="wheelWrapper">
              <div class="wheel" v-for="data in pickerData">
                <ul class="wheel-scroll">
                  <li v-for="item in data" class="wheel-item">{{item.text}}</li>
                </ul>
              </div>
            </div>
          </div>


          <div class="picker-footer"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script >
  import BScroll from 'better-scroll'

  const STATE_HIDE = 0
  const STATE_SHOW = 1

  const COMPONENT_NAME = 'picker'
  const EVENT_SELECT = 'select'
  const EVENT_VALUE_CHANGE = 'valuechange'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CHANGE = 'change'

  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      title: {
        type: String
      },
      cancelTxt: {
        type: String,
        default: '取消'
      },
      confirmTxt: {
        type: String,
        default: '确定'
      },
      selectedIndex: {
        type: Array,
        default() {
          return []
        }
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        state: STATE_HIDE,
        pickerData: this.data.slice(),
        pickerSelectedIndex: this.selectedIndex,
        pickerSelectedVal: [],
        pickerSelectedText: []
      }
    },
    created() {
      if (!this.pickerSelectedIndex.length) {
        this.pickerSelectedIndex = []
        for (let i = 0; i < this.pickerData.length; i++) {
          this.pickerSelectedIndex[i] = 0
        }
      }
    },
    methods: {
      confirm() {
        if (!this._canConfirm()) { //
          return
        }
        this.hide()

        let changed = false
        for (let i = 0; i < this.pickerData.length; i++) {
          let index = this.wheels[i].getSelectedIndex()
          this.pickerSelectedIndex[i] = index

          let value = null
          if (this.pickerData[i].length) {
            value = this.pickerData[i][index].value
          }
          if (this.pickerSelectedVal[i] !== value) {
            changed = true
          }
          this.pickerSelectedText[i] = this.pickerData[i][index].text
        }

        this.$emit(EVENT_SELECT, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)

        if (changed) {
          this.$emit(EVENT_VALUE_CHANGE, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)
        }
      },
      cancel() {
        this.hide()
        this.$emit(EVENT_CANCEL)
      },
      show() {
        if (this.state === STATE_SHOW) {
          return
        }
        this.state = STATE_SHOW

        if (!this.wheels || this.dirty) {
          this.$nextTick(() => {
            this.wheels = []
            let wheelWrapper = this.$refs.wheelWrapper
            for (let i = 0; i < this.pickerData.length; i++) {
              this._createWheel(wheelWrapper, i)
            }
            this.dirty = false
          })
        } else {      //防止多次点击
          for (let i = 0; i < this.pickerData.length; i++) {
            this.wheels[i].enable()
            this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
          }
        }
      },
      hide() {
        this.state = STATE_HIDE

        for (let i = 0; i < this.pickerData.length; i++) {
          this.wheels[i].disable()
        }
      },
      setData(data) {
        this.pickerData = data.slice()
        this.dirty = true
      },
      setSelectedIndex(index) {
        this.pickerSelectedIndex = index
      },
      refill(datas) {
        let ret = []
        if (!datas.length) {
          return ret
        }
        datas.forEach((data, index) => {
          ret[index] = this.refillColumn(index, data)
        })
        return ret
      },
      refillColumn(index, data) {
        if (this.state !== STATE_SHOW) {
          console.error('can not use refillColumn when picker is not show')
          return
        }
        const wheelWrapper = this.$refs.wheelWrapper
        let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
        let wheel = this.wheels[index]
        if (scroll && wheel) {
          let oldData = this.pickerData[index]
          this.$set(this.pickerData, index, data)
          let selectedIndex = wheel.getSelectedIndex()
          let dist = 0
          if (oldData.length) {
            let oldValue = oldData[selectedIndex].value
            for (let i = 0; i < data.length; i++) {
              if (data[i].value === oldValue) {
                dist = i
                break
              }
            }
          }
          this.pickerSelectedIndex[index] = dist
          this.$nextTick(() => {
            // recreate wheel so that the wrapperHeight will be correct.
            wheel = this._createWheel(wheelWrapper, index)
            wheel.wheelTo(dist)
          })
          return dist
        }
      },
      scrollTo(index, dist) {   //哪一列(index)的对应的哪一行(dist)
        const wheel = this.wheels[index]
        this.pickerSelectedIndex[index] = dist
        wheel.wheelTo(dist)
      },
      refresh() {
        this.$nextTick(() => {
          this.wheels.forEach((wheel, index) => {
            wheel.refresh()
          })
        })
      },
      _createWheel(wheelWrapper, i) {
        if (!this.wheels[i]) {
          this.wheels[i] = new BScroll(wheelWrapper.children[i], {
            wheel: {
              selectedIndex: this.pickerSelectedIndex[i],
              /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
              wheelWrapperClass: 'wheel-scroll',
              wheelItemClass: 'wheel-item'
            },
            probeType: 3
          })

          this.wheels[i].on('scrollEnd', () => {      //拖动结束的时候
            this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex())
          })
        } else {
          this.wheels[i].refresh()
        }

        return this.wheels[i]
      },
      _canConfirm() {   //要返回 true 才行.不滚动 停止 返回true
        return this.wheels.every((wheel) => {
          return !wheel.isInTransition
        })
      },
      scrollPlace(index,place){     //测试 滚动到 目标位置的
        this.scrollTo(index,place);
      }
    },
    watch: {
      data(newData) {
        this.setData(newData)
      }
    }
  }
</script>

<style scoped>
.picker{
    position: fixed;;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
    background-color: rgba(0,0,0,0.5);
}
.picker-fade-enter, .picker-fade-leave-active{
  opacity:0;
}
.picker-fade-enter-active,.picker-fade-leave-active{
  transition: all .3s ease-in-out;
}
.picker .picker-panel{
   position: absolute;
    z-index: 600;
    bottom: 0;
    width: 100%;
    height: 273px;
    background: #fff;
}
.picker-move-enter,.picker-move-leave-active{
   transform: translate3d(0, 273px, 0);
}
.picker-move-enter-active, .picker-move-leave-active{
  transition: all .3s ease-in-out;
}  
     
.picker-choose{
   position: relative;
    height: 60px;
    color: grey;
}  
.picker-choose .picker-title{
    margin: 0;
    line-height: 60px;
    font-weight: normal;
    text-align: center;
    font-size: 16px;
    color: grey
}
.picker-choose  .confirm, .picker-choose  .cancel{
    position: absolute;
    top: 6px;
    padding: 16px;
    font-size: 12px; 
    color:#303030;
}      
.picker-choose  .confirm{
  right: 0;
 
}
.picker-choose  .confirm.active{
   color: gray;
}
.picker-choose  .cancel{
   left: 0;
}
.picker-choose  .cancel.active{
  color: gray;
}

.picker-content{
   position: relative;
  top: 20px;
}
.picker-content  .mask-top, .picker-content .mask-bottom {
  z-index: 10;
  width: 100%;
  height: 68px;
  pointer-events: none;
  transform: translateZ(0);
}   
.picker-content .mask-top{
   position: absolute;
    top: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    background:-webkit-linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    background: -moz-linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    background: -ms-linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    background: -o-linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
}       
.picker-content  .mask-bottom {
    position: absolute;
    bottom: 1px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    background: -moz-linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    background: -ms-linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    background: -webkit-linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    background: -o-linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
}        
     
.wheel-wrapper{
    display: flex;
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: -o-flex;
    padding: 0 16px;
}
.wheel-wrapper   .wheel {
    height: 173px;
    overflow: hidden;
    font-size: 16px;
    flex:1;
    -webkit-flex:1;
    -moz-flex:1;
    -o-flex:1;
    -ms-flex:1;
}
.wheel-wrapper  .wheel-scroll {
  padding: 0;
  margin-top: 68px;
  line-height: 36px;
  list-style: none;
}
.wheel-wrapper    .wheel-item{
   list-style: none;
    height: 36px;
    overflow: hidden;
    white-space: nowrap;
    color: grey;
}      
.picker-footer {
  height: 20px;
}        

</style>
