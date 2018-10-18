<template>
	<div id="userspread">
		<div style="width:80%;height:500px;margin:0px auto" id="main"></div>
	</div>
</template>
<script>
import {userSpread} from "../../ajax/api.js";
	export default{
		data(){
			return{
				getdata:[],
				getdataX:[],
			}
		},
		created(){
			var that=this;
			userSpread().then(res=>{
				that.getdata=res.data.data;
				that.getdataXF(this.getdata);
				that.drawLine();
			})
		},
		methods:{
			getdataXF:function(data){
				var that=this;
				data.map(function(value,index){
					that.getdataX.push(value["name"]);
				})
			},
			drawLine(){
				var that=this;
				var myCharts=this.$echarts.init(document.getElementById("main"));

				var option = {
				    title : {
				        text: '用户分布',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: that.getdataX
				    },
				    series : [
				        {
				            name: '访问来源',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:that.getdata,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				};
				myCharts.setOption(option);
			}
		}
	}
</script>
<style>
	
</style>