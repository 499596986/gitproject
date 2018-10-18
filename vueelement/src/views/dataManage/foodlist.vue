<template>
	<div id="foodlist" class="datamanage">
		<template>
		  <el-table
		    :data="currentfoodlist"
		    border
		    style="width: 100%">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item label="商品名称">
		            <span>{{ props.row.foodName }}</span>
		          </el-form-item>
		          <el-form-item label="所属店铺">
		            <span>{{ props.row.shopname }}</span>
		          </el-form-item>
		          <el-form-item label="商品 ID">
		            <span>{{ props.row.foodid }}</span>
		          </el-form-item>
		          <el-form-item label="店铺 ID">
		            <span>{{ props.row.shopid }}</span>
		          </el-form-item>
		          <el-form-item label="商品分类">
		            <span>{{ props.row.foodSort }}</span>
		          </el-form-item>
		          <el-form-item label="店铺地址">
		            <span>{{ props.row.shopAddress }}</span>
		          </el-form-item>
		          <el-form-item label="商品描述">
		            <span>{{ props.row.sellevolemn }}</span>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="商品 ID"
		      prop="foodid">
		    </el-table-column>
		    <el-table-column
		      label="商品名称"
		      prop="foodName">
		    </el-table-column>
		    <el-table-column
		      label="评分"
		      prop="rate">
		    </el-table-column>
		    <el-table-column
		      label="操作"
		     >
		     	<template slot-scope="scope">
		     		<el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>		
		     	</template>
		    </el-table-column>
		  </el-table>
		</template>
		<div class="pagination">
			<el-pagination
		      @current-change="handleCurrentChange"
		      :current-page.sync="nowcurrentpage"
		      :page-size="20"
			  layout="total,prev, pager, next"
			  :total="foodlist.length">
			</el-pagination>
    	</div>


    	<el-dialog title="修改食品信息" :visible.sync="outerVisible" width="40%" top="10vh">
    		<el-dialog width="40%" title="添加规格" append-to-body :visible.sync="innerVisible">
    			<el-form :model="form2" :rules="rules" ref="form2" label-width="100px">
    				<el-form-item label="规格" prop="name">
    					<el-input v-model="form2.name"></el-input>
    				</el-form-item>
    				<el-form-item label="包装费">
    					<el-input-number v-model="form2.packfee" :min="0" :max="10"></el-input-number>
    				</el-form-item>
    				<el-form-item label="价格">
    					<el-input-number v-model="form2.price" :min="0" :max="50"></el-input-number>
    				</el-form-item>
    			</el-form>
    			<div slot="footer" class="dialog-footer">
    				 <el-button @click="innerVisible=false">取消</el-button>
    				 <el-button type="primary" @click="innercomfirm">确定</el-button>
    			</div>
    		</el-dialog>
    		<el-form :model="form1" label-width="100px">
    			<el-form-item label="食品名称">
    				<el-input v-model="form1.foodname" autocomplete="off"></el-input>
    			</el-form-item>
				<el-form-item label="食品介绍">
					<el-input v-model="form1.foodinfo" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="食品分类">
					<el-select v-model="form1.foodsort">
						<el-option label="分类1" value="feilei1"></el-option>
						<el-option label="分类2" value="feilei2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="食品图片">
					<el-upload
					  class="avatar-uploader"
					  action="/posts"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  >
					  <img v-if="form1.imageUrl" :src="form1.imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-table :data="form1.guigetable">
					<el-table-column prop="text" label="规格" width="200"></el-table-column>
					<el-table-column prop="packfee" label="包装费" width="200"></el-table-column>
					<el-table-column prop="price" label="价格" ></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button @click="outerHandleDelete(scope.$index,scope.$row)" size="small" type="danger">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="text-center mart25">
					<el-button type="primary" @click="innerVisible=true">添加规格</el-button>
				</div>
    		</el-form>
    		<div slot="footer" class="dialog-footer">
    			<el-button @click="outerVisible=false">取消</el-button>
    			<el-button type="primary" @click="outercomfirm">确定</el-button>
	    	</div>
    	</el-dialog>
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
	        foodlist:[],
	        currentfoodlist:[],
	        nowcurrentpage:1,
	        outerVisible:false,
	        innerVisible:false,
	        form1:{
	        	"foodname":"",
	        	"foodinfo":"",
	        	"foodsort":"",
	        	"foodimg":"",
	        	"imageUrl":"",
	        	"guigetable":[],
	        },
	        form2:{
	        	name:"",
	        	packfee:0,
	        	price:20,
	        },
	        rules:{
	        	name:[
	        		{required:true,message:"请输入规格",trigger:"blur"}
	        	]
	        }
	      }
	    },
	    created(){
	    	var that=this;
	    	dataManage().then(res=>{
	    		that.foodlist=res.data.data.sellerList;
	    	})
	    },
	    watch:{
	    	foodlist:function(newVal,oldVal){
	    		this.currentfoodlist=newVal.slice((this.nowcurrentpage-1)*20,this.nowcurrentpage*20);
	    	},
	    },
	    methods:{
	    	handleEdit(){
	    		this.outerVisible=true;
	    	},
	    	handleDelete(index,row){
	    		var that=this;
	    		this.$confirm("是否删除这行的数据","提示",{
	    			confirmButtonText:"确定",
	    			cancelButtonText:"取消",
	    			type:"warning"
	    		}).then(()=>{
	    			that.foodlist.splice(index,1);
	    			this.$message({
	    				type:"success",
	    				message:"删除成功",
	    				duration:'1000'
	    			})
	    		}).catch(()=>{})
	    		
	    	},
	    	handleCurrentChange(page){
	    		this.nowcurrentpage=page;
	    		this.currentfoodlist=this.foodlist.slice((page-1)*20,page*20);
	    	},
	    	handleAvatarSuccess(res,file){
	    		this.form1.imageUrl = URL.createObjectURL(file.raw);
	    	},
	    	outercomfirm(){		//外面表格确定
	    		this.outerVisible=false;
	    		console.log(this.form1)
	    		this.form1={
		        	"foodname":"",
		        	"foodinfo":"",
		        	"foodsort":"",
		        	"foodimg":"",
		        	"imageUrl":"",
		        	"guigetable":[],
		        }
	    	},
	    	innercomfirm(){		//里面表格确定
	    		var that=this;
	    		this.$refs.form2.validate((valid) => {
		          if (valid) {
		          	var obj={
		          		"text":that.form2.name,
		          		"packfee":that.form2.packfee,
		          		"price":that.form2.price
		          	}
		            that.form1.guigetable.push(obj);
		            that.innerVisible=false;
		            that.$message({
		            	"type":"success",
		            	message:"添加成功",
		            	"duration":1000
		            })

		            that.form2={
			        	name:"",
			        	packfee:0,
			        	price:20,
			        }
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
	    	},
	    	outerHandleDelete(index){		//外面表格删除点击
	    		this.form1.guigetable.splice(index,1);
	    	}
	    }
	}
</script>
<style>	
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
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
