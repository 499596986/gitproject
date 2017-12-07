<template>
	<div id="home">
		<div class="home-banner">
			<div class="swiper-container">
	            <div class="swiper-wrapper">
	                <div class="swiper-slide slide">
	                    <div class="slide-con">
	                    	<img src="../../assets/images/test.jpg" alt="">
	                    	<h2>真正好的设计,那是<br>不招责任的高低杠</h2>
	                    </div>
	                </div>
	                <div class="swiper-slide slide">
	                	<div class="slide-con">
	                    	<img src="../../assets/images/test.jpg" alt="">
	                    	<h2>真正好的设计,那是不招责任的高低杠</h2>
	                    </div>
	                </div>
	                <div class="swiper-slide slide">
	                	<div class="slide-con">
	                    	<img src="../../assets/images/test.jpg" alt="">
	                    	<h2>真正好的设计,那是不招责任的高低杠</h2>
	                    </div>
	                </div>
	                <div class="swiper-slide slide">
	                	<div class="slide-con">
	                    	<img src="../../assets/images/test.jpg" alt="">
	                    	<h2>真正好的设计,那是不招责任的高低杠</h2>
	                    </div>
	                </div>
	                <div class="swiper-slide slide">
	                	<div class="slide-con">
	                    	<img src="../../assets/images/test.jpg" alt="">
	                    	<h2>真正好的设计,那是不招责任的高低杠</h2>
	                    </div>
	                </div>
	            </div>
	            <div class="swiper-pagination"></div>
	        </div>
		</div>
		<div class="home-text">
			<div class="home-list">
				<h2>2017/12/06</h2>
				<ul>
					<li>
						<img src="../../assets/images/test.jpg" alt="">
						<p>测试测试测试<br>测试测试</p>
					</li>
					<li>
						<img src="../../assets/images/test.jpg" alt="">
						<p>测试测试测试<br>测试测试</p>
					</li>
					<li>
						<img src="../../assets/images/test.jpg" alt="">
						<p>测试测试测试<br>测试测试</p>
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>
<script>
	//import swiper from "swiper"

export default{
	name:"home",
	mounted(){
		this.init()
	},
	methods:{
		init(){
			new Swiper(".swiper-container",{ 
		              direction:"horizontal",
		              slidesPerView : 'auto',
		              autoplayDisableOnInteraction:false,
		              speed:500,
					  autoplay:3000 ,  //自动轮播
					  pagination:'.swiper-pagination'      
		    })
		}
	}
}
 


</script>
<style scope>
.home-banner .slide-con{
	position:relative;
}
.home-banner .slide-con h2{
	position:absolute;
	font-size:0.4rem;
	color:#fff;
	top:2rem;
	right:0px;
	padding:0px 0.3rem 0.3rem;
	line-height:0.8rem;
}
.home-banner .slide-con h2:after{
	content:"";
	position:absolute;
	bottom:0px;
	right:0.3rem;
	width:3rem;
	border:2px solid #ffd300;
}



</style>