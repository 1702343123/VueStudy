<template>
	<view class="grace-padding">
		<view style="margin-top:30px;" class="grace-center">
			<image src='../../static/default.png' style='width:68px; height:68px; border-radius:8px;'></image>
		</view>
		<view class="grace-form" style="margin-top:50upx;">
			<form>
				<view class="grace-items  item-border">
					<view class="grace-label">
						<view class="grace-label grace-center">手机号</view>
					</view>
					<input type="number" name="mobile" class="input" v-model="userDTO.mobile" placeholder="请输入手机号"></input>
				</view>
				<view class="grace-items  item-border">
					<view class="grace-label">
						<view class="grace-label grace-center">密&nbsp;&nbsp;&nbsp;码</view>
					</view>
					<input password type="text" name="password" class="input" v-model="userDTO.password" placeholder="请输入密码"></input>
				</view>
				<button form-type='submit' type='primary' style='background:rgb(234,111,90); margin-top:30px;' @tap="signIn(userDTO)">
					登录 <text class="grace-iconfont icon-arrow-right"></text>
				</button>
			</form>
		</view>
		<view class="grace-center" style="margin-top:20upx; line-height:50upx;color: rgb(31, 199, 253);" @tap="gotoSignUp()">
			还没有账号？点击注册
		</view>
		<!-- 第三方登录 -->
		 <view class="grace-title" style="margin-top:30px;">
			<view class="grace-h5 grace-blod grace-center" style='color:#2E2C2D'>第三方登录</view>
		</view>
		<view class="grace-login-three" style="margin-top:8px;">
			<view class="grace-iconfont icon-weixin" @tap="loginWithWx"></view>
			<view class="grace-iconfont icon-qq"></view>
			<view class="grace-iconfont icon-weibo"></view>
		</view>
	</view>
</template>
<script>
var graceChecker = require("../../graceUI/graceChecker.js");
export default {
	data() {
		return {
			userDTO: {
				mobile: '',
				password: ''
			},
		}
	},
	methods:{
		signIn: function(userDTO) {
			var _this = this;
			uni.request({
				url: this.apiServer + '/user/sign_in',
				method: 'POST',
				data: {
					mobile: userDTO.mobile,
					password: userDTO.password
				},
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					// console.log(res.data.data);
					if (res.data.code == 0) {
						//将用户数据记录在本地存储
						uni.setStorageSync('login_key', {
							userId: res.data.data.id,
							nickname: res.data.data.nickname,
							avatar: res.data.data.avatar,
							token: res.data.data.token,
							login: true
						});
						uni.showToast({
							title: '登录成功'
						});
						uni.switchTab({
							url: '../my/my'
						});
					}
					//登录失败，弹出各种原因
					else {
						uni.showModal({
							title: '提示',
							content: res.data.msg
						});
					}
				}
			});
		},
		gotoSignUp: function() {
			uni.navigateTo({
				url: '../signup/signup'
			});
		}
	}
}
</script>
<style>
.item-border{
	border-bottom: 1px solid #E0E0E0 !important;
	}
.login-sendmsg-btn{
	border:1px solid rgb(234,111,90) !important; 
	background:none !important; 
	color:rgb(234,111,90) !important; 
	width:100%; height:70upx; 
	line-height:70upx; 
	margin-top:6px; 
	font-size:30upx !important;
	}
.grace-login-three{
	display:flex; 
	justify-content:center; 
	flex-wrap:nowrap;
	}
.grace-login-three view{
	width:50px; 
	height:50px; 
	line-height:50px; 
	font-size:46px; 
	color:rgb(234,111,90); 
	text-align:center; 
	margin:8px 15px;}
</style>
<!-- <template>
	<view class="uni-flex uni-column container">
		<input class="uni-input" type="number" placeholder="输入手机号" v-model="userDTO.mobile" required="required" />
		<input class="uni-input" password type="text" placeholder="输入密码" v-model="userDTO.password" required="required" />
		<button type="primary" @tap="signIn(userDTO)">登录</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userDTO: {
					mobile: '',
					password: ''
				}
			};
		},
		onLoad() {}, -->
		<!-- // 	onLoad() {
		// 		uni.setNavigationBarTitle({
		// 			title: '登录'
		// 		});
		// 	}, -->
<!-- 		methods: {
			signIn: function(userDTO) {
				var _this = this;
				uni.request({
					url: this.apiServer + '/user/sign_in',
					method: 'POST',
					data: {
						mobile: userDTO.mobile,
						password: userDTO.password
					},
					header: {
						'content-type': 'application/json'
					},
					success: res => {
						// console.log(res.data.data);
						if (res.data.code == 0) {
							//将用户数据记录在本地存储
							uni.setStorageSync('login_key', {
								userId: res.data.data.id,
								nickname: res.data.data.nickname,
								avatar: res.data.data.avatar,
								token: res.data.data.token,
								login: true
							});
							uni.showToast({
								title: '登录成功'
							});
							uni.switchTab({
								url: '../my/my'
							});
						}
						//登录失败，弹出各种原因
						else {
							uni.showModal({
								title: '提示',
								content: res.data.msg
							});
						}
					}
				});
			}
		}
	};
</script>

<style scoped>
	input {
		height: 50px;
		border-bottom: 1px solid #eee;
		margin-bottom: 5px;
	}
</style> -->
