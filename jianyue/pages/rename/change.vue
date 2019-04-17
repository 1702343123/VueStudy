<template>
	<view>
	<input type="text" v-model="changenickname" required="required" value=""/>
	<button @tap="changeNickname(changenickname)" class="btn">确认</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				changenickname:''
			};
		},
		onLoad() {
	},
		methods:{
		changeNickname:function(changenickname){
			var _this = this;
			uni.request({
			url: 'http://localhost:8080/api/user/nickname?id='+uni.getStorageSync('login_key').userId,
			method:'put',
			data:changenickname,
			header: { 'content-type':'application/json' },
				success: res => {
					uni.navigateBack();
					}
			});
		}	
		}
	}
</script>

<style>
	.btn{
		background-color: rgb(120,193,43);
	}
</style>
