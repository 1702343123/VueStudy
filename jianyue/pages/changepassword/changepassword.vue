<template>
	<view>
		<view class="top" style="height: 40px;text-align: center;">
			<text style="font-size: 12px;color: rgb(234,111,90);line-height: 40px;">为了您的账户安全，请选择一下一种方式进行身份验证</text>
		</view>
		<view class="grace-list ">
			<view class='items' @tap="showBanner">
				<view class="title">使用当前密码验证</view>
			</view>
			<graceMaskView :show="show" v-on:close="closeBanner" >
				<view>
					<view style="height: 20px;"></view>
					<view class="one" style="margin-left: 15px;margin-top: 5px;border-bottom: 1px solid rgb(234,111,90);">
						<input class="uni-input" password type="text" placeholder="请输入当前密码" v-model="oldPassword" required="required" />
					</view>
					<view class="two" style="margin-left: 15px;margin-top: 5px;border-bottom: 1px solid rgb(234,111,90);">
						<input class="uni-input" password type="text" placeholder="请输入新密码" v-model="newPassword" required="required" />
					</view>
					<view class="three" style="margin-left: 15px;margin-top: 5px;border-bottom: 1px solid rgb(234,111,90);">
						<input class="uni-input" password type="text" placeholder="请再输入一次密码" v-model="newPassword2" required="required" />
					</view>
					<view style="height: 20px;"></view>
					<span class="submit" @tap="changePassword(newPassword)">确定</span>
				    <view style="height: 20px;"></view>
				</view>
				
			</graceMaskView>
			<view class='items'>
				<view class="title">使用手机号验证</view>
			</view>
			<view class='items'>
				<view class="title">使用邮箱验证</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import graceMaskView from "../../graceUI/components/graceMaskView.vue";
	export default {
		data() {
			return {
				staticUrl: this.staticUrl,
				show: false,
				nickname: uni.getStorageSync('login_key').nickname,
				avatar: uni.getStorageSync('login_key').avatar,
				userId: uni.getStorageSync('login_key').userId,
				password: uni.getStorageSync('login_key').password,
				newPassword: '',
				newPassword2:'',
				oldPassword:''
			};
		},

		onShow() {
			var _this = this;
			uni.request({
				url: 'http://localhost:8080/api/user/' + uni.getStorageSync('login_key').userId,
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					if (res.data.code === 0) {
						console.log(res.data.data.avatar + '————————————');
						_this.avatar = res.data.data.avatar;
						_this.nickname = res.data.data.nickname;
						_this.password = res.data.data.password;
					}
				}
			});
		}, 
		methods: {
			showBanner: function() {
				this.show = true;
			},
			closeBanner: function() {
				this.show = false;
			},
			changePassword: function(newPassword) {
				if (this.newPassword.length == 0) {
					uni.showToast({
						title: '昵称不能为空！！',
						icon: "none"
					});
				} else {
					var _this = this;
					uni.request({
						url: 'http://localhost:8080/api/user/password?id=' + uni.getStorageSync('login_key').userId,
						method: 'put',
						data: newPassword,
						header: {
							'content-type': 'application/json'
						},
						success: res => {
							uni.showModal({
								title: '提示',
								content: '修改成功，请重新登录',
								success:function(res){
									if(res.confirm){
										uni.navigateTo({
											url: '../signin/signin'
										});
									}
								}
							});
							this.show = false;
							// _this.password = this.newPassword;
							// _this.nickname = this.changenickname;
						}
					});
				}
// 				// var oldPassword2=escape(this.oldPassword);
// 				var oldPassword2=escape(this.password);
// 				// var oldPassword2=unescape(this.password);
// 				if(this.oldPassword===this.oldPassword2){
// 					uni.showToast({
// 						title: '昵称不能为空！！',
// 						icon: "none"
// 					});
// 				}else{
// 					uni.showToast({
// 						title: '密码不正确！！',
// 						icon: "none"
// 					});
// 				}
			},
		},
		components: {
			graceMaskView
		}
	}
</script>

<style>
	.submit {
		margin-left: 200px;
		/* margin-bottom: 20px; */
		font-size: 13px !important;
		letter-spacing: 3px;
	}
</style>
