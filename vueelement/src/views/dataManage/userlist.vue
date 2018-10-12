<template>
	<div id="userlist" class="datamanage">
		<template>
		  <el-table
		    :data="tableData"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="date"
		      label="#"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="注册日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="用户姓名">
		    </el-table-column>
		    <el-table-column
		      prop="id"
		      label="注册地址">
		    </el-table-column>
		  </el-table>
		</template>
		<div class="pagination">
			<el-pagination
			  @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage1"
		      :page-size="100"
			  
			  layout="total,prev, pager, next"
			  :total="1000">
			</el-pagination>
    	</el-pagination>


		</div>
		
	</div>

</template>
<script>
	import mixin from "../../mixins/mixin.js";
	export default{
		mixins:[mixin],
		data() {
	      return {
	        tableData: [{
	          date: '2016-05-02',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄',
	          id:1,
	        }, {
	          date: '2016-05-04',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1517 弄',
	           id:1,
	        }, {
	          date: '2016-05-01',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1519 弄',
	           id:1,
	        }, {
	          date: '2016-05-03',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1516 弄',
	           id:1,
	        }]
	      }
	    }
	}
</script>

<style lang="less" scoped>
	
</style>
