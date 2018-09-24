<template>
	<div id="index">
		<headers tit="汇全保-首页"></headers>
		<div class="bannerscroll better-dots mart100" style="height:3.5rem;">
			<slide ref="slide" :autoPlay="isAutoPlay" :loop="isLoop" :showDot="isShowDot" :interval="interval">
				<div v-for="item in imgarr" style="">  
			              <img :src="item">
			            </div>
			</slide>
		</div>
		<div class="menu flex">
			<dl v-for="item in menuarr" v-on:click='changeform'>
				<dt><img :src="item.img" alt=""></dt>
				<dd>{{item.text}}</dd>
			</dl>
		</div>

		<div class="bxcp marlr20">
			<h2 class="h2tit">
				保险产品<a href="javascript:void(0)" @click="$router.push('/productlist')">更多<em>></em></a>
			</h2>
			<div class="bx">
				<a class="bx-list" v-for="item in indexbxproduct" @click="$router.push('/productdetail/'+item.data[0].numid)">
					<img :src="item.data[0].img" alt="">
					<div class="bx-list-right">
						<h3>{{item.data[0].tit}}</h3>
						<p>{{item.data[0].subtit}}</p> 
						<span>{{item.type}}</span>
					</div>
				</a>
			</div> 
		</div>


	
		<div class="bxagenth2" style="margin-bottom:0.2rem">
			<h2 class="h2tit marlr20">保险代理人<a href="javascript:void(0)" @click="$router.push('/agentlist')">更多<em>></em></a></h2> 
		</div>

		<div class="agentscroll better-dots">
			<slide ref="slide2" :autoPlay="false"  :showDot="isShowDot" 
			        :interval="interval" style="overflow:hidden;">
			        <div   v-for="index in Math.ceil(indexbxagent.length/2)" class="flex">   
				          <div class="agent-list" v-for="(item,index2) in indexbxagent" v-if="(index-1)==parseInt(index2/2)">
				          	   <img :src="item.img" alt="">
				          	 <div>
				          	 	   <p>{{item.name}}</p>
				          	 	   <span>{{item.company}}</span>
				          	 </div> 
				          </div>
			       </div>
		    </slide>
		</div>

	    <div class="bxanswer  bordertop">
			<h2 class="h2tit marlr20">保险知识问答<a href="javascript:void(0)" @click="$router.push('/answerlist')">更多<em>></em></a></h2>
			<div class="bxanswer-list marlr20" v-for="(item,index) in indexbxquestion">
				<h2>{{item.question}}</h2>
				<p>{{item.time}}<span><em></em>{{item.answer.length}}</span></p>
			</div>
		</div>
		<div class="bxnews">
			<h2 class="h2tit marlr20">保险资讯<a href="javascript:void(0)" @click="$router.push('/newslist')">更多<em>></em></a></h2>
			<div class="bxnews-box marlr20">
				<a class="bx-list clearfix" v-for="item in indexbxinfomation" @click="$router.push('/newsdetail/'+item.id)">
					<img :src="item.img" alt="">
					<div class="bx-list-right">
						<h3>{{item.tit}}</h3>
						<p>{{item.subtit}}</p>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
import headers from "../components/header.vue";
import slide from "../pluginGroup/betterscroll/slide/slide.vue"
import {bxproduct,bxagent,bxquestion,bxinfomation} from "../mock/ajax.js";
import { mapState,mapMutations } from "vuex";

import {mixin} from "../mixins/index.js";

export default{
	mixins:[mixin],
	data(){
		return {
			isAutoPlay:true,
			isLoop:true,
			isShowDot:true,
			interval:3000,
			imgarr:[
				"./static/images/banner1.jpg",
				"./static/images/banner2.jpg",
				"./static/images/banner3.jpg",
				"./static/images/banner4.jpg",
				"./static/images/banner5.jpg",
			],
			menuarr:[
				{
					img:"./static/images/menu1.png",
					text:"儿女呵护"
				},
				{
					img:"./static/images/menu2.png",
					text:"父母保障"
				},
				{
					img:"./static/images/menu3.png",
					text:"人寿健康"
				},
				{
					img:"./static/images/menu4.png",
					text:"投资理财险"
				}
			],
			product:[
				"./static/images/bx.jpg",
				"./static/images/bx2.jpg",
			],

			indexbxproduct:[],
			indexbxagent:[],
			indexbxquestion:[],
			indexbxinfomation:[]

		}
	},
	created(){
	//	if(this.indexbxproduct.length==0){
			var data1=bxproduct().data;
			var data2=bxagent().data;
			var data3=bxquestion().data;
			var data4=bxinfomation().data;

			/*this.changeindexbxproduct([data1[0],data1[1],data1[2]]);
			this.changeindexbxagent(data2);
			this.changeindexbxquestion([data3[0],data3[1]]);
			this.changeindexbxinfomation([data4[0],data4[1]]);*/

			this.indexbxproduct=[data1[0],data1[1],data1[2]]
			this.indexbxagent=data2
			this.indexbxquestion=[data3[0],data3[1]]
			this.indexbxinfomation=[data4[0],data4[1]]

	//	}
	},
	computed:{
		/*...mapState({
			indexbxproduct:state=>state.indexbxproduct,
			indexbxagent:state=>state.indexbxagent,
			indexbxquestion:state=>state.indexbxquestion,
			indexbxinfomation:state=>state.indexbxinfomation
		})*/
	},
	methods:{
		/*changeform(){
			console.log("dfdfdfd")
		}*/
	},
	components:{
		headers,
		slide,
	}
}
</script>
<style lang="less">
@bgEFEFEF :#EFEFEF;
.bordertopbottom{
	border-top:0.15rem solid  @bgEFEFEF;
	border-bottom:0.15rem solid  @bgEFEFEF;
}
.bordertop{
	border-top:0.15rem solid @bgEFEFEF;
}
.menu{
	background:#fff;
	text-align:center;
	.bordertopbottom();
	padding-top:0.2rem;
	padding-bottom:0.2rem;
	dl{
		flex:1;
		-webkit-flex:1;
		img{
		width:80%;
		border-radius:50%;
		margin-bottom:0.15rem;
		}
	}
}
.h2tit{
	color:#000;
	margin-top:0.2rem;
	a{
		float:right;
		em{
			font-family: SimSun;
		    display: inline-block;
		    margin-left: 2px;
		    width: 0.18rem;
		    height: 0.18rem;
		    border-right: 1px solid #999;
		    border-top: 1px solid #999;
		    font-size: 0px;
		    transform: rotate(45deg);
		    vertical-align:middle;
		    margin-top:-2px;	
		}
		font-size:0.26rem;
	}
}

.bxcp .bx-list:last-child{
	border-bottom:0px;
}
.bxagenth2{
	.bordertop();
}
.bxagent{
	.bordertopbottom();
}
.agent-list{
	flex:1;
	-webkit-flex:1;
	padding-bottom:0.25rem;
	text-align:center;
	padding-top:0.2rem;
	>img{
		width:2rem;
		height:2rem;

		border-radius:50%;
	}
	p{
		margin:0.2rem 0px;
	}
	span{
		display:inline-block;
		background:#ffe981;
		padding:2px 4px;
		color:#000;
	}
}
.bxanswer-list{
	padding:0.25rem 0px;
	border-bottom:1px solid @bgEFEFEF;
	h2{
		white-space:nowrap;
		text-overflow:ellipsis;
		overflow:hidden;
		margin-bottom:0.3rem;
	}
	p{
		color:#666;
		font-size:12px;
		span{
			float:right;
			em{display:inline-block;width:0.25rem;height:0.25rem;
				border:1px solid #666;border-radius:5px;margin-right:0.1rem;}
		}
	}
}


#index .better-dots .dots .dot.active{
  background:#00c99c;
   width:8px;
}
</style>