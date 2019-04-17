<template>
	<view class="all">
		<!-- <view class="old">
			<text class="a">旧昵称：</text>
			<text>{{nickname}}</text>
		</view> -->
		<view class="new">
			<text>新昵称：</text>
			<input class="input" v-model="changenickname" placeholder="请输入新昵称"  type="text" required="required" value=""/>
		</view>
		<button type="primary" @tap="rename(changenickname)">确定</button>
	</view>
</template>

<script>
export default{
	data(){
		return{
			changenickname:'',
			// nickname:uni.getStorageSync('login_key').nickname,
		};
	},
	onLoad() {
	},
	methods:{
		rename:function(changenickname){
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

<style scoped>
	.old{
		margin-top: 20px;
		margin-left: 10px;
		margin-bottom: 10px;
		align-content: center;
	}
	.new{
		margin-top: 20px;
		display: flex;
		align-content: center;
		margin-left: 10px;
		margin-bottom: 20px;
	}
	.input{
		border-bottom: 1px solid rgb(244,244,244);
	}
	
</style>
