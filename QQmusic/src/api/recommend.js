import Vue from "vue";
import {commonParams,options} from "./config.js";


export default{
   getRecommend(){
	  var url="https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
	  var data=Object.assign({},commonParams,{
		 platform: 'h5',
		 uin: 0,
		 needNewCode: 1,
		 callbackQuery :"jsonpCallback",	//例如："http://www.baidu.com?jsonpCallback=tan0"
    	 callbackName  :"tan0"
	  });
      return Vue.jsonp(url,data,options);
   },
   getDiscList(){
   	  const url="http://localhost:8080/api/getDiscList";
   	  const data=Object.assign({},{
   	  	    g_tk: 5381,
		    notice: 0,
		    inCharset: 'utf8',
		    outCharset: 'utf-8',
		    platform: 'yqq',
		    hostUin: 0,
		    sin: 0,
		    ein: 29,
		    sortId: 5,
		    categoryId: 10000000,
		    needNewCode: 0,
		    rnd: Math.random(),
		    format: 'json'
   	  })

   	  return new Promise(function(resolve,reject){
   	  	  Vue.http(url,{ params: data }).then(res=>{
            console.log(res)
	   	   	  resolve(res.data);
	   	  })
   	  });

   },
   getSongList(disstid){
   	   const url="http://localhost:8080/api/getSongList";

   	   const data=Object.assign({},commonParams,{
   	   	  disstid,
   	   	  type:1,
   	   	  json:1,
   	   	  utf8:1,
   	   	  onlysong:0,
   	   	  platform:"yqq",
   	   	  hostUin:0,
   	   	  needNewCode:0
   	   })

   	   return new Promise(function(resolve,reject){
   	   	  Vue.http(url,{params:data}).then(res=>{
   	   	  	  resolve(res.data);
   	   	  })
   	   })
   }
}

























