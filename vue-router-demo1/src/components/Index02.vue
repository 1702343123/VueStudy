<template>
	<div class="container">
		
		<router-link to="/new_course" >
			<button class="btn">新建班课</button>
			</router-link>
		<h3>{{courses.length}}门班课</h3>
		<div class="course-conainer">
			<div class="course" v-for="(course,index) in courses" :key="index">
				<div class="course-cover">
					<img :src="course.cover" />
				</div>
				<div class="course.name">
					<p class="title">{{course.courseName}}</p>
				</div>
				<div class="course-class">
					<p class="title">{{course.courseClass}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Index02',
		data(){
			return{
				courses:[
					{
						courseId:1,
						courseName:'轻量级框架技术',
						courseClass:'软件1721',
						cover:'https://public-cdn-oss.mosoteach.cn/mssvc/cover/2019/02/1dec295ea61fa4ffcab3c2fc8d2e217a.jpg?x-oss-process=style/s200x200'
					},
					{
						courseId:2,
						courseName:'Web前端',
						courseClass:'软件1721',
						cover:'https://public-cdn-oss.mosoteach.cn/mssvc/cover/2019/02/b3a3af29306688d7a9919bf5b4e8be69.jpg?x-oss-process=style/s200x200'
					}
				]
			};
		}
	};
</script>

<style scoped>
	.course-conainer{
		display: flex;
	}
	.course{
		width: 260px;
		height: 350px;
		margin-right: 10px;
		background-color: #fff;
		display: flex;
		flex-flow: column;
	}
	.course-cover{
		flex: 1 1 60%;
	}
	.course-cover{
		width: 100%;
		height: 100%;
	}
	.course-name{
		flex: 1 1 25%;
	}
	.title{
		font-size: 16px;
		color: #0000FF;
	}
	.btn{
		width: 100px;
		height: 40px;
		border: 1px solid #fff;
		background: #3A8EE6;
		border-radius: 20px;
		
	}
</style>
