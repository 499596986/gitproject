import {mapMutations,mapState} from "vuex"
var mixin={
	data(){
		return {

		}
	},
	created(){
	},
	computed:{
		...mapState({
			formflag:state=>state.formflag
		})
	},
	methods:{
		...mapMutations(["changeformflag"]),
		changeform(){
			this.changeformflag();
		}
	}
}




export {mixin}