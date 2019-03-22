<template>
	<div class="container">
		<h2>班课{{ id }}详情页面</h2>
		<img :src="course.cover">
		<p>{{course.courseName}}</p>
		<p>{{course.courseClass}}</p>
		<div class="course-end" v-if="loginUserId === course.userId">
			<button class="btn" @click="endCourse(course)" >结束班课</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CourseDetail',
	data() {
		return {
			id: this.$route.params.id,
			course: {
				
			},
			loginUserId: 1,
		};
	},
	methods: {
		endCourse: function(course) {
			var _this = this;
			this.$http({
				method: 'put',
				url: 'http://localhost:8080/api/course',
				data: {
					courseId:course.courseId,
                    userId: course.userId,
                    courseName: course.courseName,
                    courseClass: course.courseClass,
                    cover: course.cover,
                    finished: 1
                }
			}).then(function() {
				alert('班课结束成功');
				_this.$router.push('/');
			});
		}
	},
	created() {
		var _this = this;
		this.$http.get('http://localhost:8080/api/course/' + this.id).then(function(response) {
			_this.course = response.data;
		});
	}
};
</script>
<style scoped>
	.btn{
		width: 120px;
		height: 40px;
		border: 1px solid #fff;
		background-color: rgb(0, 187, 221);
		border-radius: 20px;
		outline: none;
		color: #fff;
		font-size: 16px;
	}
</style>
