function size(){
     var wDpr = window.devicePixelRatio;  
     var deviceWidth = document.documentElement.clientWidth;
         if(deviceWidth > 750){				//设定最大的字体尺寸用的是750px的
             deviceWidth = 750;
         }
         // $("html").css("font-size",deviceWidth / 7.5 + 'px');
         document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';    //根据设计的尺寸宽度而定,这边设定的尺寸是750px的。
         document.getElementsByTagName("html")[0].setAttribute("data-dpr",wDpr);
}
 size();
 window.onresize=function(){
   size();
 }