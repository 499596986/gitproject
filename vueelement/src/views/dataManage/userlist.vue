<template>
	<div id="userlist" class="datamanage">
		<template>
		  <el-table
		    :data="currentdata"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="id"
		      label="#"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="time"
		      label="注册日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="username"
		      label="用户姓名">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="注册地址">
		    </el-table-column>
		  </el-table>
		</template>
		<div class="pagination">
			<el-pagination
		      @current-change="handleCurrentChange"
		     
		      :page-size="20"
			  :current-page="nowcurrentpage"
			  layout="total,prev, pager, next"
			  :total="userlist.length">
			</el-pagination>
    	</el-pagination>


		</div>
		
	</div>

</template>
<script>
	import {dataManage} from "../../ajax/api.js";
	import mixin from "../../mixins/mixin.js";
	export default{
		mixins:[mixin],
		data() {
	      return {
		    userlist:[],
		    currentdata:[],
		    nowcurrentpage:1
	      }
	    },
	    created(){
	    	var that=this;
	    	dataManage().then(res=>{
	    		that.userlist=res.data.data.userList;
	    		that.currentdata=that.userlist.slice(0,20);
	    	})
	    },
	    computed:{

	    },
	    methods:{
	    	handleCurrentChange(parm){
	    		this.nowcurrentpage=parm;
	    		this.currentdata=this.userlist.slice((20*(parm-1)),20*parm);
	    	},
	    }
	}
</script>

<style lang="less" scoped>
	
</style>
