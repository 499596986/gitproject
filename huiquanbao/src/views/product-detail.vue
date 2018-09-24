<template>
	<div id="product-detail">
		<headers tit="汇全保-保险产品详情" leftshow="true"></headers>
		<div class="mart100">
			<img :src="currentData.bannerimg" alt="">
			<div class="priduct-text padlr20">
				<h2 class="mart25 marb40">{{currentData.tit}}</h2>
				<p>{{currentData.subtit}}</p>
				<div class="btn-menu">
					<span v-for="(item,index) in currentData.keywords">{{item}}</span>
				</div>
			</div>
			<div class="product-prebtn padlr20">
				<button v-on:click="changeformflag">预约定制</button>
			</div>
			<div class="tbcase padlr20">
				 <p class="f">投保方案</p>
				 <p v-for="(item,index) in currentData.plan">{{item.title}}<span class="fd-right">{{item.con}}</span></p>
			</div>
			<div class="sure-product">
				<h2>保障项目</h2>
				<table>
					<thead>
						<tr>
							<td>保障项目</td>
							<td>保障额度</td>
							<td>保障内容</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in currentData.project">
							<td class="f">{{item.case}}</td>
							<td class="s">{{item.price}}</td>
							<td class="t">
								<p class="text">{{item.content}}</p>
								<p class="btn"><a href="javascript:void(0)">查看详细</a></p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="product-info">
				<h2>产品解说</h2>
				<p>{{currentData.subtit}}</p>
			</div>
			<div class="product-tj">
				<h2>产品推荐<a href="javascript:void(0)" class="fd-right" @click="$router.push('/productlist')">更多<em>></em></a></h2>
				<div class="bx">
					<a class="bx-list" v-for="item in indexbxproduct" @click="changeRoute('/productdetail/'+item.data[0].numid)">
						<img :src="item.data[0].img" alt="">
						<div class="bx-list-right">
							<h3>{{item.data[0].tit}}</h3>
							<p>{{item.data[0].subtit}}</p> 
							<span>{{item.type}}</span>
						</div>
					</a> 
					
				</div> 
			</div>
		</div>
	</div>
</template>
<script>
import headers from "../components/header.vue";
import {bxproduct} from "../mock/ajax.js";
import {mapState} from "vuex";
import {mixin} from "../mixins/index.js";
/*var productobj={
	"意外险":0,
	"养老险":1,
	"健康险":2,
	"重疾险":3,
	"少儿险":4,
	"理财险":5
}*/
export default{
	mixins:[mixin],
	data(){
		return {
			currentData:{},
			indexbxproduct:[]
		}
	},
	created(){
		this.getdata();
		var data1=bxproduct().data;
		this.indexbxproduct=[data1[0],data1[1],data1[2]]
	},
	watch:{
		"$route"(to,from){
			this.getdata();
		}
	},
	methods:{
		getdata(){
			var that=this;
			var productDetailId=this.$route.params.numid;
			var productdata=bxproduct().data;
			var newarr=[];
			productdata.forEach(function(item,index){
				item.data.forEach(function(item2,index2){
					newarr.push(item2);
				})
			})
			newarr.forEach(function(item,index){
				if(item.numid==productDetailId){
					that.currentData=item;
					return;
				}
			})
		},
		changeRoute(url){
			this.$router.push(url);
		}
	},
	components:{
		headers
	}
}
</script>
<style lang="less">
.bordert5{
	border-top:0.2rem solid #ddd;
}
.priduct-text{
	h2{
		font-size:0.3rem;
		font-weight:bold;
	}
	>p{font-size:0.26rem;text-indent:0.25rem;}
	.btn-menu{
		margin:0.4rem 0px;
		span{
			display:inline-block;
			padding:5px 6px;
			border:1px solid #448ef6;
			color:#448ef6;
			border-radius:5px;
			margin-right:5px;
			font-size:14px;
		}
	}
}
.product-prebtn button{
	width: 100%;
    height: 50px;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    border: none;
    border-radius: 5px;
    background: #448ef6;
    margin-bottom: 20px;
}
.tbcase{
	.bordert5();
	padding:0.15rem 0.2rem;
	p{
		color:#666;
		padding:0.2rem 0px;
		border-bottom:1px solid #d9d9d9;
		&.f{
			color:#000;
		}
	}
}
.sure-product{
	.bordert5();
	padding:0.15rem 0.2rem;
	h2{
		padding:0.2rem 0px;
		color:#000;
	}
	table{
		text-align:center;
		tr{
			border-bottom:1px solid #fff;
			td{
				border-right:1px solid #fff;
			}
		}
		thead{
			background:#04459e;
			color:#fff;
			line-height:0.8rem;
		}
		tbody{
			td{padding:0.2rem 0.15rem;color:#000;}
			td.f{background:#f2f2f2;width:33.333333%;}
			td.s{background:#a0d9ff;width:33.333333%}
			td.t{
				background:#bcd8ff;font-size:12px;
				p.text{
					display: -webkit-box;
				    -webkit-box-orient: vertical;
				    -webkit-line-clamp: 3;
				    overflow: hidden;
				    text-align:left;
				}
				p.btn a{
					display:inline-block;
					color:#fff;
					margin-top:0.15rem;
					background:#448ef6;
					width:100%;
					padding:3px 0px;
					border-radius:4px;
				}
			}
		}
	}
}
.product-info{
	.bordert5();
	padding:0.1rem 0.2rem 0.3rem;
	h2{
		padding:0.2rem 0px;
		color:#000;
	}
	p{
		text-indent:0.25rem;
	}
}
.product-tj{
	.bordert5();
	padding:0px 0.2rem;
	color:#000;
	h2{
		padding:0.2rem 0px;
		a{
			font-size:14px;
			em{font-family:"宋体";display:inline-block;margin-left:0.1rem;}
		}
	}
}
</style>