<template>
	<view class="content">
		<view class="top">
			<view class="left">
			    <text class="title">{{title}}</text>
				<image src="../../static/sousuo.png" class="image1"></image>
				<image src="../../static/tianjia.png" class="image2"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '微信'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		height: 400upx;
		margin-top: 10upx;
	}
    .top{
		display: flex; 
		 flex-direction: column;
		/* justify-content: space-between;
		align-content: center; */
	}
	.left{
		margin-top: 20upx;
		margin-left: 10upx;
	}
	.title{
		padding-left: 20upx;
		padding-top: 40px;
	}
	.image1{
		width: 50upx;
		height: 50upx;
		padding-left: 400upx;
		padding-top: 40upx;
	}
	.image2{
		width: 50upx;
		height: 50upx;
		padding-left: 500upx;
		padding-top: 40upx;
	}
	
	
</style>
