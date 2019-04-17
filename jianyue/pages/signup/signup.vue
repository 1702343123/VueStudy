<template>
	<view class="all">
		<view class="one">
			<input class="input-mobile" type="number" v-model="mobile" placeholder="请输入手机号" required="required"/>
		</view>
		<view class="two">
			<view class="a">
				<input class="input-yzm" type="number" v-model="verifyCode" placeholder="请输入验证码" required="required"/>
			</view>
			<view class="b" type="primary">
				<span v-show="show" @click="getCode()" @tap="getVerifyCode" class="text">获取验证码</span>
				<span v-show="!show" class="count">{{count}}s后重新获得</span>
			</view>


			<!-- <button type="primary" class="btn" @tap="getCode()">获取验证码</button> -->
		</view>
		<button type="primary" @tap="checkCode">下一步</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				count: '',
				timer: null,
				mobile: '',
				verifyCode: ''
			}
		},
		onLoad() {},
		methods: {

			getCode() {
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
				}
			},

			getVerifyCode: function() {
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
						} else {
							uni.showModal({
								title: '提示',
								content: res.data.msg
							});
						}
					}
				});
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
		flex: 1 1 80%;
	}

	.b {
		height: 40px;
		flex: 1 1 20%;
		font-size: 16px;
		margin-top: 5px;
		background-color: rgb(26, 173, 25);
		color: #EEEEEE;
		border-radius: 5px;
		line-height: 40px;
		/* justify-content: center; */
		text-align: center;
	}

	.text {
		padding-top: 10px;
	}
</style>
