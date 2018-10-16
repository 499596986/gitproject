<template>
	<div id="addgoods"class="adddata">
		<h3 class="text-center addgoods-header">选择食品种类</h3>
		<div class="addgoods-form1 form12">
			<el-form ref="form1" :model="form"  label-width="100px">
				<el-form-item label="食品种类">
					<el-select placeholder="请选择" v-model="form.foodtype">
						<el-option label="请选择" value="1"></el-option>
					</el-select>
				</el-form-item>	
			    <div class="collapse-box" :class="{active:form1flag}">
					<el-form-item label="食品种类">
						<el-input  placeholder="种类" v-model="form.foodtypevalue"></el-input>
					</el-form-item>
					<el-form-item label="种类描述">
						<el-input  placeholder="种类描述" v-model="form.foodinfo"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">确定提交</el-button>
					</el-form-item>
				</div>
				<p class="clickup text-center" @click="clickup"><i class="el-icon-caret-top"></i>添加食品种类</p>
			</el-form>
		</div>
		<div class="addgoods-form2">
			<h3 class="text-center addgoods-header mart30">添加食品</h3>
			<div class="addgoods-form2 form12">
				<el-form ref="form2" :model="form2"  :rules="rules2" label-width="100px">
					<el-form-item label="食品名称" prop="name">
						<el-input placeholder="食品名称" v-model="form2.name"></el-input>
					</el-form-item>
					<el-form-item label="食品活动" prop="acitivity">
						<el-input placeholder="食品活动" v-model="form2.acitivity"></el-input>
					</el-form-item>
					<el-form-item label="食品详情" prop="detail">
						<el-input placeholder="食品详情" v-model="form2.detail"></el-input>
					</el-form-item>
					<el-form-item label="上传图片" class="imgupload">
						<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
							
						</el-upload>
					</el-form-item>
					<el-form-item label="食品特点" prop="character">
						<el-select v-model="form2.character">
							<el-option label="请选择" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="食品规格" prop="guige">
						<el-radio-group v-model="form2.guige">
							<el-radio label="单规格"></el-radio>
							<el-radio label="多规格"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="包装费" prop="packfee">
						<el-input-number v-model="form2.packfee"></el-input-number>
					</el-form-item>
					<el-form-item label="价格" prop="price">
						<el-input-number v-model="form2.price"></el-input-number>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm2('form2')">确认添加食品</el-button>
					</el-form-item>
				</el-form>

			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				activeNames:['1'],
				form1flag:true,
				form:{
					foodtype:"",
					foodtypevalue:"",
					foodinfo:""
				},
				imageUrl:"",
				form2:{
					name:"",
					acitivity:"",
					detail:"",
					character:"",
					guige:"",
					packfee:"",
					price:"",

				},
				rules2:{
					name:[
						{required:true,message:"请输入食品名称",trigger:"blur"}
					],
					activity:[
						{required:true,message:"请输入活动名称",trigger:"blur"}
					],
					detail:[
						{required:true,message:"详情",trigger:"blur"}
					],
					character:[
						{required:true,message:"特点",trigger:"blur"}
					],
					guige:[
						{required:true,message:"规格",trigger:"blur"}
					],
					packfee:[
						{required:true,message:"包装费用",trigger:"blur"}
					],
					price:[
						{required:true,message:"价钱",trigger:"blur"}
					]
				}
			}
		},
		methods:{
			handleChange(){

			},
			onSubmit:function(){

			},
			submitForm2(formName){
				this.$refs[formName].validate((valid)=>{
					if(valid){
						console.log(this.form2)
					}else{
						console.log("失败")
						return false;
					}
				})
			},
			clickup(){
				if(this.form1flag){
					this.form1flag=false;
				}else{
					this.form1flag=true;
				}
			},
			handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		        console.log(this.imageUrl)
		    },
		    beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        console.log(file)
		        return isJPG && isLt2M;
		    }
		}
	}

</script>
<style>

	/**图片**/
	#addgoods .avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	#addgoods .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	}
	#addgoods .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	}
	#addgoods .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	}

</style>
<style lang="less" scoped>
	.el-select{width:100%}
	.addgoods-header{
		font-size:16px;
		margin-bottom:15px;
	}
	.form12{
		border:1px solid #ddd;
		border-radius:5px;
		padding:10px 40px 0px 0px;
	}
	.collapse-box{
		background:#f2f2f2;
		padding-top:15px;
		margin-right:-40px;
		padding-right:40px;
		border-bottom:1px solid transparent;
		height:218px;
		overflow:hidden;
		transition:all 0.3s;
	}
	.collapse-box.active{
		height:0px;
		padding-top:0px;
	}
	.clickup{
		padding:10px 0px 10px;
		font-size:16px;
		color:#999;
		cursor:pointer;
		margin-right:-40px;
		i{
			font-size:25px;
			display:inline-block;
			margin-right:5px;
			position:relative;
			top:3px;
		}
		&:hover{
			background:#f2f2f2;
			color:#000;
		}
	}

</style>
