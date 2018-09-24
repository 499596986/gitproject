function size(){
     var wDpr = window.devicePixelRatio;  
     var deviceWidth = document.documentElement.clientWidth;
         if(deviceWidth > 750){				//设定最大的字体尺寸用的是750px的
             deviceWidth = 500;
         }
         // $("html").css("font-size",deviceWidth / 7.5 + 'px');
         document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';    //根据设计的尺寸宽度而定,这边设定的尺寸是750px的。
         document.getElementsByTagName("html")[0].setAttribute("data-dpr",wDpr);
}
 size();
 window.onresize=function(){
   size();
 }



var preHandler=function(e){e.preventDefault();}
function popsh(cliele,showele,conele,cloele){
	if(conele==undefined){conele=".areapart"}
	if(cloele==undefined){cloele=".clo"} //cloele:关闭的元素
	$(cliele).click(function(e){	//cliele :点击的元素
	    e.stopPropagation();		//showele:显示的元素
	    $(showele).css({"display":"block"})		//conele:实际显示内容部分
	    document.addEventListener("touchmove",preHandler,false);
	})
	$(showele).click(function(){
	    $(showele).css({"display":"none"})	
	    document.removeEventListener("touchmove",preHandler,false) 

	})
	$(conele).click(function(e){
	     e.stopPropagation();
	})
	$(cloele).click(function(){
	    $(showele).css({"display":"none"})	
	    document.removeEventListener("touchmove",preHandler,false) 
	})
}






