<template>
	<div id="foodlist" class="datamanage">
		<template>
		  <el-table
		    :data="currentdata"
		    border
		    style="width: 100%">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item label="用户名1">
		            <span>{{ props.row.username}}</span>
		          </el-form-item>
		          <el-form-item label="店铺名称">
		            <span>{{ props.row.shopName}}</span>
		          </el-form-item>
		          <el-form-item label="收货地址">
		            <span>{{ props.row.getAddress }}</span>
		          </el-form-item>
		          <el-form-item label="店铺 ID">
		            <span>{{ props.row.shopId }}</span>
		          </el-form-item>
		          <el-form-item label="店铺地址">
		            <span>{{ props.row.shopAddress }}</span>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="订单ID"
		      prop="orderId">
		    </el-table-column>
		    <el-table-column
		      label="总价格"
		      prop="totalPrice">
		    </el-table-column>
		    <el-table-column
		      label="订单状态"
		      prop="payStatus">
		    </el-table-column>
		  </el-table>
		</template>

		<div class="pagination">
			<el-pagination
		      @current-change="handleCurrentChange"
		      :current-page.sync="nowcurrentpage"
		      :page-size="20"
			  layout="total,prev, pager, next"
			  :total="orderlist.length">
			</el-pagination>
    	</div>
	</div>
</template>
<script>
	import mixin from "../../mixins/mixin.js";
	import {dataManage} from "../../ajax/api.js";
	export default{
		mixins:[mixin],
		data() {
	      return {
	        tableData5: [
		        {
		          id: '12987122',
		          name: '好滋好味鸡蛋仔',
		          category: '江浙小吃、小吃零食',
		          desc: '荷兰优质淡奶，奶香浓而不腻',
		          address: '上海市普陀区真北路',
		          shop: '王小虎夫妻店',
		          shopId: '10333'
		        }, {
		          id: '12987123',
		          name: '好滋好味鸡蛋仔',
		          category: '江浙小吃、小吃零食',
		          desc: '荷兰优质淡奶，奶香浓而不腻',
		          address: '上海市普陀区真北路',
		          shop: '王小虎夫妻店',
		          shopId: '10333'
		        }, {
		          id: '12987125',
		          name: '好滋好味鸡蛋仔',
		          category: '江浙小吃、小吃零食',
		          desc: '荷兰优质淡奶，奶香浓而不腻',
		          address: '上海市普陀区真北路',
		          shop: '王小虎夫妻店',
		          shopId: '10333'
		        }, {
		          id: '12987126',
		          name: '好滋好味鸡蛋仔',
		          category: '江浙小吃、小吃零食',
		          desc: '荷兰优质淡奶，奶香浓而不腻',
		          address: '上海市普陀区真北路',
		          shop: '王小虎夫妻店',
		          shopId: '10333'
		        }
		    ],
		    orderlist:[],
		    currentdata:[],
		    nowcurrentpage:1
	      }
	    },
	    created(){
	    	var that=this;
	    	dataManage().then(res=>{
	    		that.orderlist=res.data.data.paylist;
	    		that.currentdata=that.orderlist.slice(0,20);

	    		console.log(that.currentdata)
	    	})
	    },
	    methods:{
	    	handleCurrentChange(parm){
	    		this.nowcurrentpage=parm;
	    		this.currentdata=this.orderlist.slice((20*(parm-1)),20*parm);
	    	},
	    }
	}
</script>
<style lang="less">
	.demo-table-expand {
    font-size: 0;
	 }
	.demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	}
</style>
<style lang="less" scoped>
	
</style>
