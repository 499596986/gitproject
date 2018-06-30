
var state={
	searchHistory:[],
	playList:{		
		list:[],	//播放列表
		playOrder:0	//播放顺序	默认0(顺序播放) 1(随机播放)	2(单曲循环)	
	},		
	isplay:false,		//是否播放
	currentIndex:1,		//当前的第几首歌曲
	fullScreenFlag:0,     //全屏是否展开	
	favoriteMusic:[]	  //喜欢的歌曲, 存的是歌曲的 singid	
}


export default state;