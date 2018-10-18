<template>
	<div id="firstpage">
		<div class="firstpage-header">
			<h2 class="text-center">数据统计</h2>
			<div >
				<p>
					<span>当日数据：</span>
					<span><em>{{newAdminData[newAdminData.length-1]}}</em>新增用户</span>
					<span><em>{{newOrderData[newOrderData.length-1]}}</em>新增订单</span>
					<span><em>{{newUserData[newUserData.length-1]}}</em>新增管理员</span>
				</p>
				<p class="sec">
					<span>总数据：</span>
					<span><em>{{allData[0]}}</em>注册用户</span>
					<span><em>{{allData[1]}}</em>订单</span>
					<span><em>{{allData[2]}}</em>管理员</span>
				</p>
			</div>
		</div>
		<div class="firstpage-con">
			<div id="main" style="width: 80%;height:600px;margin-left:100px;margin-top:40px"></div>
		</div>
	</div>

</template>
<script>
	import mixin from "../mixins/mixin.js";
	import {dataCount} from "../ajax/api.js";

	export default{
		mixins:[mixin],
		data(){
			return {
				newAdmin:"",
				newOrder:"",
				newUser:"",
				newAdminData:[],
				newAdminX:[],
				newOrderData:[],
				newOrderX:[],
				newUserData:[],
				newUserX:[],
				allData:[],
			}
		},
		created(){
			var that=this;
			dataCount().then(res=>{
				console.log(res)
				that.newAdmin=res.data.data.newAdmin;
				that.newOrder=res.data.data.newOrder;
				that.newUser=res.data.data.newUser;
				that.getdata(that.newAdmin,that.newOrder,that.newUser);		
				that.drawLine();			
			})
		},
		methods:{
			getdata(admin,order,user){
				var that=this;
				var num=0;
				for(var key in admin){
					that.newAdminData.push(admin[key]);
					that.newAdminX.push(key);
					num+=admin[key];
				}
				that.allData.push(num);
				num=0;
				for(var key in order){
					that.newOrderData.push(order[key]);
					that.newOrderX.push(key);
					num+=order[key];
				}
				that.allData.push(num);
				num=0;
				for(var key in user){
					that.newUserData.push(user[key]);
					that.newUserX.push(key);
					num+=user[key];
				}
				that.allData.push(num);
			},
			drawLine(){
				var that=this;
				let myChart=this.$echarts.init(document.getElementById("main"));
				var option = {
				    title: {
				        text: '走势图',
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    grid:{
				    	top:100
				    },
				    legend: {
				        data:['新注册用户','新增订单',"新增管理员"]
				    },
				    toolbox: {
				        show: true,
				        feature: {
				            dataZoom: {
				                yAxisIndex: 'none'
				            },
				            dataView: {readOnly: false},
				            magicType: {type: ['line', 'bar']},
				            restore: {},
				            saveAsImage: {}
				        }
				    },
				    xAxis:  {
				        type: 'category',
				        boundaryGap: false,
				        data:that.newAdminX
				    },
				    yAxis: [
				    	{
					        type: 'value',
					        name:"用户",
				    	},
				    	{
				    		type:"value",
				    		name:"订单",
				    		position:"right"
				    	}
				    ],
				    series: [
				        {
				            name:'新注册用户',
				            type:'line',
				            data:that.newAdminData,
				          /*  markPoint: {
				                data: [
				                    {type: 'max', name: '最大值'},
				                    {type: 'min', name: '最小值'}
				                ]
				            },*/
				            markLine: {
				                data: [
				                    /*{type: 'average', name: '平均值'}*/
				                ]
				            },
				            markPoint:{
				            	data:[
				            		{
				            			name:"最大值",
				            			type:"max"
				            		},
				            		{
				            			name:"最小值",
				            			type:"min"
				            		}
				            	]
				            }
				        },
				        {
				            name:'新增订单',
				            type:'line',
				            data:that.newOrderData,
				            yAxisIndex:1,
				            markPoint: {
				                data: [
				                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
				                ]
				            },
				            markLine: {
				                data: [
				                   /* {type: 'average', name: '平均值'},*/
				                   /* [{
				                        symbol: 'none',
				                        x: '90%',
				                        yAxis: 'max'
				                    }, {
				                        symbol: 'circle',
				                        label: {
				                            normal: {
				                                position: 'start',
				                                formatter: '最大值'
				                            }
				                        },
				                        type: 'max',
				                        name: '最高点'
				                    }]*/
				                ]
				            },
				             markPoint:{
				            	data:[
				            		{
				            			name:"最大值",
				            			type:"max"
				            		},
				            		{
				            			name:"最小值",
				            			type:"min"
				            		}
				            	]
				            }
				        },
				        {
				            name:'新增管理员',
				            type:'line',
				            data:that.newUserData,
				            markPoint: {
				                data: [
				                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
				                ]
				            },
				            markLine: {
				                data: [
				                   /* {type: 'average', name: '平均值'},*/
				                   /* [{
				                        symbol: 'none',
				                        x: '90%',
				                        yAxis: 'max'
				                    }, {
				                        symbol: 'circle',
				                        label: {
				                            normal: {
				                                position: 'start',
				                                formatter: '最大值'
				                            }
				                        },
				                        type: 'max',
				                        name: '最高点'
				                    }]*/
				                ]
				            },
				            markPoint:{
				            	data:[
				            		{
				            			name:"最大值",
				            			type:"max"
				            		},
				            		{
				            			name:"最小值",
				            			type:"min"
				            		}
				            	]
				            }
				        }

				    ]
				};
				myChart.setOption(option);

			}
		},
		computed:{
			
		}
	}



</script>
<style lang="less" scoped>
	.firstpage-header{
		h2{
			font-size:28px;
			color:#000;
		}
		p{
			margin-top:10px;
			span{
				display:inline-block;
				margin-right:8px;
				width:200px;
				padding:5px 0px;
				background:#e5e9f2;
				color:#666;
				border-radius:6px;
				text-align:center;
				&:first-child{
					background:#ff9800;
					color:#fff;
					font-size:20px;
				}
				em{
					font-size:25px;
					color:#000;
				}
			}
			&.sec span:first-child{
				background:#20a0ff;
				color:#fff;
			}
		}
	}
</style>
