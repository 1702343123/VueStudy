<template>
	<div class="container">
		<div class="logo">
		<img src="../assets/logo.png" />
		</div>
		<div class="sign-box">
			<div class="title">
			<router-link to="/sign_up" class="active">注册</router-link>
			<img src="../assets/point.png" class="point"/>
			<router-link to="/sign_in" class="active">登录</router-link>
				
			</div>
			<router-view />
		</div>
	</div>
	
</template>

<script>
	export default {
		name: 'Sign',
		data() {
			return {
				
			};
		}
	};
</script>

<style>
	.container{
		background-color: rgb(241,241,241);
	}
	.logo{
		position: absolute;
        top: 56px;
        margin-left: 50px;
	}
	.sign-box{
		width: 400px;
		height: 400px;
		position: fixed;
		background-color: darkgray;
		right: 500px;
		top: 150px;
		
	}
	.title{
		margin-top: 30px;
		text-align: center;
		font-size: 20px;
		text-decoration: none;
	}
	.active{
		color: #ea6f5a;
		text-decoration:none; 
		border-bottom: 2px solid #ea6f5a;
	}
	.point{
		width: 20px;
		height: 20px;
		
	}
</style>
