<template>
	<div id="addshop" class="adddata">
		<div class="addcon">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				    <el-form-item label="店铺名称" prop="name">
				      <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
				    </el-form-item>
				    <el-form-item label="详细地址" prop="address">
				      <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
				    </el-form-item>
					<el-form-item label="联系电话" prop="phone">
				      <el-input v-model="ruleForm.phone"></el-input>
				    </el-form-item>

					<el-form-item label="店铺简介" prop="shopinfo">
				      <el-input v-model="ruleForm.shopinfo"></el-input>
				    </el-form-item>
					<el-form-item label="店铺标语" prop="shopbanner">
				      <el-input v-model="ruleForm.shopbanner"></el-input>
				    </el-form-item>
					<el-form-item label="店铺分类" prop="shopsort">
					    <el-select v-model="ruleForm.shopsort" placeholder="请选择">
					    <el-option label="分类1" value="fenlei1"></el-option>
					    <el-option label="分类2" value="fenlei2"></el-option>
					    </el-select>
					</el-form-item> 



					<el-form-item label="店铺特点" prop="shoppoint" class="shoppoint">
						<p>
							<span>品牌保证<el-switch v-model="ruleForm.shoppoint[0]"></el-switch></span>
					        <span>蜂鸟专送<el-switch v-model="ruleForm.shoppoint[1]"></el-switch></span>
					        <span>新开店铺<el-switch v-model="ruleForm.shoppoint[2]"></el-switch></span>
						</p>
						<p>
							<span>外卖保<el-switch v-model="ruleForm.shoppoint[3]"></el-switch></span>
					        <span>准时达<el-switch v-model="ruleForm.shoppoint[4]"></el-switch></span>
					        <span>新开店铺<el-switch v-model="ruleForm.shoppoint[5]"></el-switch></span>
						</p>
					</el-form-item>


				   <el-form-item label="配送费" prop="fee">
				   		 <el-input-number v-model="ruleForm.fee"  :min="1" :max="10" label="描述文字"></el-input-number>
				   </el-form-item>
				   <el-form-item label="起送价" prop="startfee">
				   		<el-input-number v-model="ruleForm.startfee" :min="1" :max="10" label="描述文字"></el-input-number>
				   </el-form-item>
					<el-form-item label="营业时间" prop="shophours1" >
					    <el-time-select
					    	placeholder="请输入起始时间"
						    v-model="ruleForm.shophours1"
						    :picker-options="{
						      start: '08:30',
						      step: '00:15',
						      end: '18:30'
						    }"
						 	>
						</el-time-select>
						<el-form-item  prop="shophours2" style="display:inline-block;">
							 <el-time-select
							   placeholder="请输入结尾时间"
							    v-model="ruleForm.shophours2"
							    :picker-options="{
							      start: '08:30',
							      step: '00:15',
							      end: '18:30',
							      minTime: ruleForm.shophours1
							    }"
							 	>
							</el-time-select>
						</el-form-item>
					</el-form-item>
					

					<!-- <el-form-item label="上传店铺头像" prop="shophead">
					  	<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
									    </el-form-item>
					<el-form-item label="上传营业执照" prop="shoplicence">
					  	<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
									    </el-form-item>
									    <el-form-item label="上传餐饮服务许可证" prop="servicelicence">
					  	<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
									    </el-form-item> -->
					<el-form-item label="优惠活动" prop="discount">
					    <el-select v-model="ruleForm.discount" placeholder="请选择">
					     <el-option label="满减优惠" value="满减优惠"></el-option>
					     <el-option label="优惠大酬宾" value="优惠大酬宾"></el-option>
					    </el-select>
					</el-form-item>
					<el-table
					      :data="tableData"
					      style="width: 100%;margin-bottom:20px;" border>
					      <el-table-column
					        prop="title"
					        label="活动标题"
					        width="100">
					      </el-table-column>
					      <el-table-column
					        prop="name"
					        label="活动名称"
					        width="100">
					      </el-table-column>
					      <el-table-column
					        prop="detail"
					        label="活动详情">
						  </el-table-column>
					      <el-table-column
					      label="操作"
					      width="100">
					      <template slot-scope="scope">
					        <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
					      </template>
					    </el-table-column>
					</el-table>

				   <div class="text-center">
				   	<el-button type="primary" @click="submitForm('ruleForm')" style="margin-right:30px">立即创建</el-button>
				   	<el-button @click="resetForm('ruleForm')">重置</el-button>
				   </div>
			</el-form>
		</div>
	</div>
</template>
<script>
	import mixin from "../../mixins/mixin.js";
	export default{
		mixins:[mixin],
		data() {
			var phonerule = (rule, value, callback) => {
      			var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;      //11位有效数字
      			if(!myreg.test(value)){
      				callback(new Error('请正确输入您的联系方式'));
      			}else{
      				callback();
      			}
		    };
	      return {
				ruleForm: {
		          name: '',
		          address: '',
		          phone: '',
		          shopinfo: '',
		          shopbanner:"",
		          shopsort: "",
		          shoppoint:[],
		          fee: '',
		          startfee:"",
		          shophours1:"",
		          shophours2:"",
		          shophead:"",
		          shoplicence:"",
		          servicelicence:"",
		          discount:"",
		        },
		        rules: {
		          name: [
		            { required: true, message: '请输入活动名称', trigger: 'blur' },
		          ],
		          address: [
		            { required: true, message: '请选择活动区域', trigger: 'blur' }
		          ],
		          phone: [
		           /* { required: true, message: '请选择活动区域', trigger: 'blur' }*/
		           /* { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }*/
		              { validator: phonerule, trigger: 'blur' }
		          ],
		          shopinfo: [
		            /*{ type: 'date', required: true, message: '请选择时间', trigger: 'blur' }*/
		             { required: true, message: '请选择活动区域', trigger: 'blur' }
		          ],
		          shopbanner: [
		            /*{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'blur' }*/
		            { required: true, message: '请选择活动区域', trigger: 'blur' }
		          ],
		          shopsort: [
		            { required: true, message: '请选择活动资源', trigger: 'change' }
		          ],
		          shoppoint: [
		            { type: 'array',required: true, message: '请至少选择一个', trigger: 'change' }
		          ],
		          fee: [
		            { required: true, message: '请填写活动形式', trigger: 'blur' }
		          ],
		           startfee: [
		            { required: true, message: '请填写活动形式', trigger: 'blur' }
		          ],
		          shophours1: [
		            /*{ required: true, message: '请填写活动形式', trigger: 'blur' }*/
		            { required: true, message: '请选择日期', trigger: 'blur' }
		          ],
		          shophours2: [
		            /*{ required: true, message: '请填写活动形式', trigger: 'blur' }*/
		            {required: true, message: '请选择日期', trigger: 'blur' }
		          ],
		          shophead: [
		            { required: true, message: '请填写活动形式', trigger: 'blur' }
		          ],
		          shoplicence: [
		            { required: true, message: '请填写活动形式', trigger: 'blur' }
		          ],
		          servicelicence: [
		            { required: true, message: '请填写活动形式', trigger: 'blur' }
		          ],
		          discount: [
		            { required: true, message: '请填写活动形式', trigger: 'blur' }
		          ],
		        },
		        tableData: [{
		            title: '减',
		            name: '满减优惠',
		            detail: '满30减5,满60减8'
		        }]
	      };
	    },
	    methods: {
	      submitForm(formName) {
	      	var that=this;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            console.log(that.ruleForm)
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      },
	      handleClick(row){	//删除行

	      }
	    }
	}
</script>
<style lang="less" scoped>
	.shoppoint span{
		display:inline-block;
		margin-right:10px;
	}
</style>
