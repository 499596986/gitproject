
var getters={
	currentSong(state){
		if(state.playList.list.length==0){
			return  {}; 	//顺序播放	
		}else{
			return state.playList.list[state.currentIndex-1] || {}; 	//顺序播放	
		}

	},
}

export default getters;