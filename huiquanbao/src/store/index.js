import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
  	indexbxproduct:[],			//首页数据缓存
  	indexbxagent:[],
  	indexbxquestion:[],
  	indexbxinfomation:[],

  	allbxproduct:[],	//所有的保险产品
    formflag:false
  },
  getters:{

  },
  mutations:{
  	 changeindexbxproduct(state,arr){
  	 	state.indexbxproduct=arr;
  	 },
  	 changeindexbxagent(state,arr){
  	 	state.indexbxagent=arr;
  	 },
  	 changeindexbxquestion(state,arr){
  	 	state.indexbxquestion=arr;
  	 },
  	 changeindexbxinfomation(state,arr){
  	 	state.indexbxinfomation=arr;
  	 },
  	 changeallbxproduct(state,arr){
  	 	state.allbxproduct=arr;
  	 },
     changeformflag(state){
      if(state.formflag){
        state.formflag=false;
      }else{state.formflag=true}
     }
  },
  actions:{

  }
})












