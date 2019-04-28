<template>
	<view class="container">
		<view class="one" style="border-bottom: 2px solid rgb(234,111,90);margin-left: 10px;margin-right: 20px;">
		    <input class="uni-input" password type="text" placeholder="输入密码" v-model="password" required="required" />
		</view>
		<view class="two" style="border-bottom: 2px solid rgb(234,111,90);margin-left: 10px;margin-right: 20px;margin-bottom: 20px;">
		    <input class="uni-input" password type="text" placeholder="确认密码" v-model="password2" required="required" />
		</view>
		<button  @tap="signUp(userDTO)" type="primary" style="background: rgb(234,111,90);">立即注册</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userDTO: {
				mobile: '',
				password: '',
				password2:''
			}
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		console.log(option.mobile);
		this.mobile = option.mobile;
	},
	methods: {
		signUp: function(userDTO) {
			if(this.password===this.password2){
				var _this = this;
				uni.request({
					url: this.apiServer + '/user/sign_up',
					method: 'POST',
					header: { 'content-type': 'application/json' },
					data: {
						mobile: _this.mobile,
						password: _this.password
					},
					success: res => {
					  	if (res.data.code === 0) {
				        uni.showModal({
							title: '提示',
							content: '注册成功,是否立即登录？',
							success:function(res){
								if(res.confirm){
									uni.navigateTo({
										url: '../signin/signin'
									});
								}
							}
						});
// 						uni.navigateTo({
// 							url: '../signin/signin'
// 							});
						} else {
							uni.showModal({
								title: '提示',
								content: res.data.msg
							});
						}
					}
				});
			}else{
				uni.showModal({
					title:'提示',
					content:'两次密码不一致！'
				});
			}
			
		}
	}
};
</script>

<style>
	.uni-input{
		margin-left: 10px;
		margin-top: 20px;
		margin-bottom: 10px;
	}
</style>
