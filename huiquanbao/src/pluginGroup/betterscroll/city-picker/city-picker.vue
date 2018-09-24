<template>
  <picker @select="handleSelect(arguments)" :data="linkageData" :selected-index="selectedIndex"
          ref="picker" :title="title" @change="handleChange" :cancelTxt="cancelTxt" :confirmTxt="confirmTxt"></picker>
</template>

<script >
  import Picker from '../picker/picker.vue'     //还是引用picker组件

  const COMPONENT_NAME = 'city-picker'

  export default {
    name: COMPONENT_NAME,
    components: {
      Picker
    },
    props: {
      data: {
        type: Array,
        default: []
      },
      title: {
        type: String,
      },
      selectedIndex: {
        type: Array,
        default: [0, 0, 0]
      },
      cancelTxt: {
        type: String,
        default:"取消"
      },
      confirmTxt: {
        type: String,
        default:"确定"
      }
    },
    data() {
      return {
        tempIndex: [0, 0, 0]        //每一个的位置
      }
    },
    computed: {
      linkageData() {               //传递的数据
       // console.log(this.tempIndex[0])
        const [provinceList, cityList, areaList] = this.data
        const provinces = provinceList
        const cities = cityList[provinces[this.tempIndex[0]].value]
        const areas = areaList[cities[this.tempIndex[1]].value]

        return [provinces, cities, areas]
      }
    },
    watch: {
      linkageData() {
        this.$refs.picker.refresh()
      }
    },
    methods: {
      show() {
        this.$refs.picker.setData(this.linkageData)
        this.$refs.picker.show()
      },
      handleSelect(args) {
        this.$emit('select', ...args)
      },
      handleChange(i, newIndex) {     //这挺重要的,滚动 省份改变的 对应的 市区也改变的
       // console.log(i+"/"+newIndex+":"+this.tempIndex)
        //哪一列中的哪一行(都是从0开始的)
        if (newIndex !== this.tempIndex[i]) {   //滚动结束发生的变化
          for (let j = 2; j > i; j--) {
            this.tempIndex.splice(j, 1, 0)
            this.$refs.picker.scrollTo(j, 0)  //滚动到 哪一列(j)的  哪一行(0行)  
          }


          this.tempIndex.splice(i, 1, newIndex)
        }
      }
    }
  }
</script>
