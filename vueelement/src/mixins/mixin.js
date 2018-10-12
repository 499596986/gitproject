import cookie from "cookiejs";

export default{
	created:function(){
		var username=cookie.get("vueusername");
		if(!username){
			this.$router.push("/");
		}
	}
}












