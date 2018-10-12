<template>
	<div id="login" class="bg-324057">
		<transition name="ani-up">
			<div class="login-con text-center" v-if="show">
				<h2>elm后台管理系统</h2>
				<div class="form">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">
						<el-form-item prop="username">
							<el-input placeholder="用户名" v-model="ruleForm.username"></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input placeholder="密码" type="password" v-model="ruleForm.password"></el-input>
						</el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">登入</el-button>
					</el-form>
					<div class="form-text">
						温馨提示<br>
						未登录过的新用户,自动注册<br>
						注册过的用户可凭账号密码登录
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import cookie from "cookiejs";

export default{
	data:function(){
		return {
			show:false,
			ruleForm:{
				username:"",
				password:"",
			},
			rules:{
				username:[
					{required:true,message:"请输入用户名",trigger:'blur'}
				],
				password:[
					{
						required:true,message:"请输入密码",trigger:"blur"
					}
				]
			}
		}
	},
	created(){
		var that=this;
		this.show=true;
		this.$nextTick(function(){
			var username=cookie.get("vueusername");
			var password=cookie.get("vuepassword");
			if(username){
				this.ruleForm.username=username;
				this.ruleForm.password=password;
				this.$message({
		          message: '恭喜您,登录成功',
		          type: 'success',
		        });
	            setTimeout(function(){
		        	that.$router.push("/index");
		        },1000)
			}
		})
	},
	methods:{
		submitForm(formName){
			var that=this;
			this.$refs[formName].validate((valid)=>{
				if(valid){
					var username=cookie.get("vueusername");
					if(username){
						this.$message({
				          message: '你已注册过此账号',
				          type: 'warning'
				        });
					}else{
						var username=this.ruleForm.username;
						var password=this.ruleForm.password;
						cookie({ "vueusername":username, "vuepassword":password }, { // 批量设置
						  "expires": 7,
						  "path": '/',
						  "domain":""
						});
						this.$message({
				          message: '恭喜您,登录成功',
				          type: 'success',
				        });
				        setTimeout(function(){
				        	that.$router.push("/index");
				        },1000)
				        
					}
				}else{
					return false;
				}
			})
		}
	}
}
</script>
<style lang="less" scoped>
	#login{
		position:fixed;
		width:100%;
		height:100%;
		top:0px;
		bottom:0px;
		left:0px;
		right:0px;
	}
	.login-con{
		position:absolute;
		top:40%;
		left:50%;
		transform:translate(-50%,-50%);
		-webkit-transform:translate(-50%,-50%);
		-moz-transform:translate(-50%,-50%);
		-ms-transform:translate(-50%,-50%);
		-o-transform:translate(-50%,-50%);
		width:400px;
		h2{
			font-size:30px;
			color:#fff;
			letter-spacing:3px;
		}
		.form{
			margin-top:40px;
			background:#fff;
			border-radius:8px;
			padding:25px 15px 15px;
			input{margin-bottom:15px;}
		}
		button{
			width:100%;
			font-size:18px;
		}
		.form-text{
			color:red;
			text-align:center;
			font-size:12px;
			margin-top:15px;
		}
	}
	.ani-up-enter{
		top:35%;
		opacity:0;
	}
	.ani-up-enter-active{
		transition:all 0.5s ease-out;
	} 
</style>













