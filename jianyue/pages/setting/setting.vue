<template>
	<view class="container">
		<view class="list">
			<view class="list-item"><text>文章推送</text></view>
			<view class="list-item"><text>新消息推送</text></view>
			<view class="list-item">
				<navigator url="../user_info/user_info">
					个人资料
                </navigator>
			</view>
			<view class="list-item">
				<button type="primary" @tap="logout">退出当前账号</button>
				<!-- @tap="logout" -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '设置'
		});
	},
	methods: {
		logout: function() {
			console.log('log out');
			uni.removeStorageSync('login_key');
			uni.showToast({
				title: '已经退出当前账号'
			});
			uni.navigateBack();
		}
	}
};
</script>

<style >
	
</style>
