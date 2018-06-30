import Vue from "vue"
import {commonParams} from "./config"
export default{
	getLyric(mid){
		 const url = 'http://localhost:8080/api/lyric'

		  const data = Object.assign({}, commonParams, {
		    g_tk: 5381,
		    songmid: mid,
		    platform: 'yqq',
		    hostUin: 0,
		    needNewCode: 0,
		    categoryId: 10000000,
		    pcachetime: +new Date(),
		    format: 'json'
		  })

		  return new Promise(function(resolve,reject){
		  	  Vue.http(url,{params:data}).then(res=>{
		  	  	   resolve(res.data);
		  	  })
		  })
	}
}