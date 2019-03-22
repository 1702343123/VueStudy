<template>
	<!-- 根容器 -->
	<div class="container">
		<input type="text" placeholder="请输入班课名称" v-model="courseName" class="input-box"/>
		<input type="text" placeholder="请输入班级" v-model="courseClass" class="input-box"/>
		<input type="text" placeholder="请输入图片地址" v-model="cover" class="input-box"/>
		<button @click="addCourse" class="btn">新增班课</button>
	</div>
</template>

<script>
	export default{
		name:'NewCourse02',
		data(){
			return{
				courseName:'',
				courseClass:'',
				cover:''
			};
		},
		methods:{
			addCourse:function(){
				alert(this.courseName+this.courseClass);
			}
		}
	};
</script>

<style scoped>
	.container{
		display: flex;
		flex-direction: column;
		padding-top: 20px;
		padding-left: 350px;
	}
	.input-box{
		width: 500px;
		height: 30px;
		margin-bottom: 20px;
		font-size: 14px;
	}
	.btn{
		width: 80px;
		height: 40px;
		border: 2px solid #3A8EE6;
		background-color: #fff;
		border-radius: 8px;
		outline: none;
		color: rgb(0,187,221);
		
	}
</style>
