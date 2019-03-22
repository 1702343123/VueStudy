<template>
	<div id="app">
		<div class="header">
			<router-link to="/">
				<img src="../static/banke.png" class="logo"/>
			</router-link>
			<router-link to="/task" class="nav-item">任务中心</router-link>
			<router-link to="/lib" class="nav-item">库管理</router-link>
			<router-link to="/ucenter" class="nav-item">王杰</router-link>
		</div>
		<div class="container"><router-view></router-view></div>
	</div>
</template>

<script>
export default {
	name: 'App'
};
</script>

<style>
#app {
	background-color: rgb(244, 244, 244);
}
.header {
	display: flex;
	height: 80px;
	background-color: #fff;
	font-size: 20px;
	padding-left: 120px;
	align-items: center;
}
.nav-item {
	width: 100px;
	margin-right: 20px;
}
.logo{
	widows: 100px;
	height: 35px;
	margin-right: 200px;
}
.container {
	width: 85%;
	margin: 0 auto;
	padding-bottom: 40px;
}
a {
	text-decoration: none;
	color: #aaa;
}
a:hover {
	color: rgb(2,165,218);
}
</style>