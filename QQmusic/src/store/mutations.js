
var mutaions={
	changefullScreenFlag:function(state){	//播放全屏是否展开
		if(state.fullScreenFlag){
			state.fullScreenFlag=0;
		}else{
			state.fullScreenFlag=1;
		}
	},
	changePlayList(state,playlist){
		state.playList=playlist;
	},
	changeCurrentIndex(state,currentindex){
		state.currentIndex=currentindex;
	},
	changefavorite(state,singid){
		var flag=1;
		var indexpos=state.favoriteMusic.indexOf(singid);
		if(indexpos>-1){
			state.favoriteMusic.splice(indexpos,1);
		}else{
			state.favoriteMusic.push(singid);
		}
	},
	changeplaying(state,flag){	//isplay
		if(flag){
			state.isplay=true;
		}else{
			if(state.isplay){
				state.isplay=false;
			}else{
				state.isplay=true;
			}
		}
	}
}

export default mutaions;
























