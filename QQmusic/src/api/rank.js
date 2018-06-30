import Vue from "vue";
import { commonParams,options } from "./config"

export default{
	getTopList(){
		 const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

		  const data = Object.assign({}, commonParams, {
		    platform: 'h5',
		    needNewCode: 1,
		     callbackQuery :"jsonpCallback",	//例如："http://www.baidu.com?jsonpCallback=tan0"
    	     callbackName  :"tan0"
		  })

		  return Vue.jsonp(url, data, options)
	},
	getTopListDetail(topid){
		 const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

		  const data = Object.assign({}, commonParams, {
		    topid,
		    platform: 'h5',
		    needNewCode: 1,
		    page: 'detail',
		    type: 'top',
		    tpl: 3,
		    callbackQuery :"jsonpCallback",	//例如："http://www.baidu.com?jsonpCallback=tan0"
    	    callbackName  :"tan0"
		  })

		  return Vue.jsonp(url, data, options)
	}
}










