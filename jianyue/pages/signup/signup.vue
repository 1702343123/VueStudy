<template>
	<view class="all">
		<view class="one">
			<input class="input-mobile" type="number" v-model="mobile" placeholder="请输入手机号" required="required" />
		</view>
		<view class="two">
			<view class="a">
				<input class="input-yzm" type="number" v-model="verifyCode" placeholder="请输入验证码" required="required" />
			</view>
			<view class="b" type="primary">
				<span v-show="show" @tap="getVerifyCode"  class="text">获取验证码</span>
				<span v-show="!show" class="count">{{count}}s&nbsp;后重新获得</span>
            </view>
		</view>
		<button form-type='submit' type='primary' style='background:rgb(234,111,90); margin-top:30px;' @tap="checkCode()">
			下一步 <text class="grace-iconfont icon-arrow-right"></text>
		</button>
		<!-- <button type="primary" @tap="checkCode">下一步</button> -->
	</view>
</template>

<script>
	// var graceChecker = require("../../graceUI/graceChecker.js");
	export default {
		data() {
			return {
				show: true,
				count: '',
				timer: null,
				mobile: '',
				verifyCode: '',


			}
		},
		onLoad() {},
		methods: {

// 			getCode() {
// 				const TIME_COUNT = 60;
// 				if (!this.timer) {
// 					this.count = TIME_COUNT;
// 					this.show = false;
// 					this.timer = setInterval(() => {
// 						if (this.count > 0 && this.count <= TIME_COUNT) {
// 							this.count--;
// 						} else {
// 							this.show = true;
// 							clearInterval(this.timer);
// 							this.timer = null;
// 						}
// 					}, 1000)
// 				}
// 			},

			getVerifyCode: function() {
				var myreg=/^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.mobile)){
					uni.showToast({ title: '请正确填写手机号码', icon : "none"});
				    return false;
				}else{
					var _this = this;
					uni.request({
						url: this.apiServer + '/user/verify',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							mobile: _this.mobile
						},
						success: res => {
							if (res.data.code === 0) {
								uni.showToast({
									title: '验证码已发送'
								});
								_this.disabled = true;
								console.log(_this.disabled);
								const TIME_COUNT = 60;
								if (!this.timer) {
									this.count = TIME_COUNT;
									this.show = false;
									this.timer = setInterval(() => {
										if (this.count > 0 && this.count <= TIME_COUNT) {
											this.count--;
										} else {
											this.show = true;
											clearInterval(this.timer);
											this.timer = null;
										}
									}, 1000)
								};
							} else {
								uni.showModal({
									title: '提示',
									content: res.data.msg
								});
							}
						}
					});
				}
				
			},
			checkCode: function() {
				var _this = this;
				console.log(_this.verifyCode);
				uni.request({
					url: this.apiServer + '/user/check',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						mobile: _this.mobile,
						verifyCode: _this.verifyCode
					},
					success: res => {
						console.log(res.data);
						if (res.data.code === 0) {
							uni.navigateTo({
								url: '../password/password?mobile=' + _this.mobile
							});
						} else {
							uni.showModal({
								title: '提示',
								content: res.data.msg
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	.one {
		height: 50px;
	}

	.two {
		display: flex;
		height: 50px;
		margin-bottom: 10px;
	}

	.input-mobile {
		height: 50px;
		border-bottom: 1px solid #eee;
		margin-bottom: 5px;
		margin-left: 10px;

	}

	.input-yzm {
		height: 50px;
		border-bottom: 1px solid #eee;
		margin-bottom: 5px;
		margin-left: 10px;
		/* flex: 1 1 80%; */
	}

	.a {
		flex: 1 1 60%;
	}
/* .login-sendmsg-btn{
		border:1px solid #00C777 !important; 
		background:none !important; 
		color:#00C777 !important; 
		width:100%; 
		height:70upx; 
		line-height:70upx; 
		margin-top:6px; 
		font-size:30upx !important;
		} */
	.b {
		height:80upx;
		flex: 1 1 40%;
		margin-top: 5px;
		margin-right: 20px;
		border-radius: 8px;
		text-align: center;
		border:1px solid rgb(234,111,90) !important; 
		background:none !important; 
		color:rgb(234,111,90) !important;
		line-height:80upx;
		font-size:30upx !important;
	}

	.text {
		padding-top: 10px;
	}
</style>
