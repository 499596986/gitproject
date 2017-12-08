<template>
	<div id="home" v-on:scroll="pagescroll">
		<div v-if="!this.$parent.loadanimate" class="documenth">
			<div class="home-banner">
				<div class="swiper-container">
		            <div class="swiper-wrapper">
		                <div class="swiper-slide slide" v-for="(item,index) in swiperdata">
		                    <div class="slide-con" v-on:click="goto(item.id)">
		                    	<img src="../../assets/images/banner.jpg" alt="">
		                    	<h2>{{item.title}}</h2>
		                    </div>
		                </div>
		            </div>
		            <div class="swiper-pagination"></div>
		        </div>
			</div>
			<div class="home-text">
				<div class="home-list">
					<h2>{{date}}</h2>
					<ul>
						<li v-for="(item,index) in stories" v-on:click="goto(item.id)">
							<img src="../../assets/images/content.jpg" alt="">
							<p>{{item.title}}</p>
						</li>
					</ul>
				</div>
			</div>
			
			<div class="home-text" v-for="(item,index) in prestories">
				<div class="home-list">
					<h2>{{item.date}}</h2>
					<ul>
						<li v-for="(item2,index2) in item.stories" v-on:click="goto(item2.id)">
							<img src="../../assets/images/content.jpg" alt="">
							<p>{{item2.title}}</p>
						</li>
					</ul>
				</div>

			</div>

			<div class="homeloading" v-if="homeloading">
				加载中。。。
			</div>

		</div>
	</div>
</template>
<script>
//import Vue from "vue"
import api from "../../mock/api.vue";
import $ from "jquery"

export default{
	name:"home",
	data(){
		return {
			date:"",
			swiperdata:[],
			stories:[],
			prestories:[],
			homeloading:false,
			day:-1,
			scrollhei:0

		}
	},
	mounted(){
		this.$parent.loadanimate=true;
		this.init();	
		this.date=new Date();
		console.log(this.scrollhei);
		console.log("a")
	},
	activated(){
		console.log("acitvate")
		console.log(this.scrollhei);
	},
	watch:{
		"$route"(to,from){
			//this.$parent.headerback=true;
			console.log(this.scrollhei)
			// $(".documenth").scrollTop(this.scrollhei);
			//$("#home").scrollTop(this.scrollhei);
		}
	},
	methods:{
		init(){
			api.gethomenowdata().then(res=>{
				this.$parent.loadanimate=false;
				this.date=res.data.date;
				this.swiperdata=res.data.top_stories;
				this.stories=res.data.stories;
				this.$nextTick(function(){
					new Swiper(".swiper-container",{ 
		              direction:"horizontal",
		              slidesPerView : 'auto',
		              autoplayDisableOnInteraction:false,
		              speed:500,
					  autoplay:3000 ,  //自动轮播
					  pagination:'.swiper-pagination'      
				    })
				})

			})	
		},
		goto(id){
			this.$router.push({"path":"/detail/add/"+id});

			this.scrollhei=$("#home").scrollTop();

console.log(this.scrollhei)

			//$("#home").scrollTop(this.scrollhei);
		},
		pagescroll(){

			var windowh=$(window).height();
			var scrolltop=$("#home").scrollTop();
			var documenth=$(".documenth").height();
			this.scrollhei=scrolltop;

			if((documenth-windowh-scrolltop<30)&& this.homeloading==false){
				this.homeloading=true;


				this.day=this.day+1;
				let d=new Date().getTime()-this.day*86400000;
				this.getlistdata(this.currendate(d));
			}
		},
		getlistdata(date){
			api.gethomepredata(date).then(res=>{
				
				this.prestories.push(res.data);
console.log(res);
				this.homeloading=false;

			}).catch(err=>console.log("获取不到后台数据"))
		},
		currendate(date){
			let year=new Date(date).getFullYear();
			let month=new Date(date).getMonth()+1;
			let dat=new Date(date).getDate();
			month=month<=9?("0"+month):month;
			dat=dat<=9?("0"+dat):dat;
			return ""+year+month+dat;

		}
	}
}
 


</script>
<style scope>
#home{
	width:100%;
	height:100%;
	overflow:auto;
}



.home-banner .slide-con{
	position:relative;
	height:6rem;
	overflow:hidden;
}
.home-banner .slide-con h2{
	position:absolute;
	font-size:0.4rem;
	color:#fff;
	top:2rem;
	right:0px;
	padding:0px 0.3rem 0.3rem;
	line-height:0.8rem;
	text-align:right;
}
.home-banner .slide-con h2:after{
	content:"";
	position:absolute;
	bottom:0px;
	right:0.3rem;
	width:3rem;
	border:2px solid #ffd300;
}


.homeloading{
	text-align:center;
	font-size:0.36rem;
	margin:0.3rem 0px 0.3rem;
}

</style>