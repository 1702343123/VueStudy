<template>
	<view>
		<view class="topone">常规设置</view>
		<view class="grace-list grace-bg-white grace-common-mt">
			<view class='items' @tap="showBanner">
				<view class="title">修改昵称<text>{{nickname}}</text></view>
				<view class="arrow-right"></view>
			</view>
			<graceMaskView :show="show" v-on:close="closeBanner">
				<view>
					<view style="height: 30px;"></view>
					<view style="margin-left: 20px;font-size: 15px;">
						修改昵称
					</view>
					<view class="input">
						<input class="rename" type="text" v-model="changenickname" placeholder="请输入新昵称" />
					</view>
					<view style="height: 30px;"></view>

					<span class="submit" @tap="rename(changenickname)">确定</span>
					<view style="height: 20px;"></view>
				</view>

			</graceMaskView>
			<view class='items' @tap="showActionSheet">
				<view class="title">修改头像</view>
				<view style="margin-right: 30px;margin-top:7px;">
					<image :src="avatar" class="avatarone" @tap="showActionSheet"></image>
				</view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">修改年龄<text>18岁</text></view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">修改性别<text>男</text></view>
				<view class="arrow-right"></view>
			</view>
			<view class='items' @tap="gotoChangePassword">
				<view class="title">重置密码</view>
				<view class="arrow-right"></view>
			</view>
		</view>

		<view class="grace-list grace-bg-white grace-common-mt">
			<view class='items'>
				<view class="title">
					通&nbsp;知
					<switch checked style='float:right'></switch>
				</view>
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
				changenickname: ''
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
		//下拉刷新事件
		// 		onPullDownRefresh: function (){
		// 			this.refreshFunc();
		// 		}, 
		methods: {
			showBanner: function() {
				this.show = true;
			},
			closeBanner: function() {
				this.show = false;
			},
			rename: function(changenickname) {
				if (this.changenickname.length == 0) {
					uni.showToast({
						title: '昵称不能为空！！',
						icon: "none"
					});
				} else {
					var _this = this;
					uni.request({
						url: 'http://localhost:8080/api/user/nickname?id=' + uni.getStorageSync('login_key').userId,
						method: 'put',
						data: changenickname,
						header: {
							'content-type': 'application/json'
						},
						success: res => {
							uni.showToast({
								title: '修改成功'
							});
							this.show = false;
							_this.nickname = this.changenickname;
						}
					});
				}
			},
			gotoChangePassword: function() {
				uni.navigateTo({
					url: '../changepassword/changepassword'
				});
			},
			showActionSheet: function() {
				console.log('show');
				var _this = this;
				uni.showActionSheet({
					itemList: ['拍照', '从相册选择'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						//选择的是拍照功能
						if (res.tapIndex == 0) {
							uni.chooseImage({
								count: 1,
								sourceType: ['camera'],
								success: function(res) {
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePaths[0],
										success: function() {
											console.log('save success');
											uni.uploadFile({
												url: 'http://localhost:8080/api/user/avatar', //仅为示例，非真实的接口地址
												filePath: res.tempFilePaths[0],
												name: 'file',
												formData: {
													userId: _this.userId
												},
												success: uploadFileRes => {
													console.log(uploadFileRes.data);
													_this.avatar = uploadFileRes.data;
												}
											});
										}
									});
								}
							});
						}
						//从相册选择
						if (res.tapIndex == 1) {
							uni.chooseImage({
								count: 1, //默认9
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都
								sourceType: ['album'], //从相册选择
								success: function(res) {
									console.log(JSON.stringify(res.tempFilePaths));
									uni.uploadFile({
										url: 'http://localhost:8080/api/user/avatar',
										filePath: res.tempFilePaths[0],
										name: 'file',
										formData: {
											userId: _this.userId
										},
										success: uploadFileRes => {
											console.log(uploadFileRes.data);
											_this.avatar = uploadFileRes.data;
										}
									});
								}
							});
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			}
		},
		components: {
			graceMaskView
		}
	}
</script>
<style>
	.avatarone {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.topone {
		color: rgb(234, 111, 90);
		margin-left: 20px;
		margin-top: 20px;
		font-size: 13px;
	}

	.input {
		margin-top: 10px;
		margin-left: 20px;
		margin-right: 20px;
		border-bottom: 2px solid rgb(234, 111, 90);
	}

	.submit {
		margin-left: 200px;
		/* margin-bottom: 20px; */
		font-size: 13px !important;
		letter-spacing: 3px;
	}
</style>


<!-- <template>
	<view class="all">
		<view class="one">
			<text class="text1">用户名</text>
			<navigator url="../rename/rename">
				{{nickname}}
			</navigator>
		</view>
		<view class="two">
			<text class="text2">头像</text>
			<image :src="avatar" class="avatar" @tap="showActionSheet"></image>
		</view>
		<view class="one">
			<text class="text3">修改密码</text>
		</view>
	</view>
</template> -->

<!-- // <script>
// export default {
// 	data() {
// 		return {
// 			nickname: uni.getStorageSync('login_key').nickname,
// 			avatar: uni.getStorageSync('login_key').avatar,
// 			userId: uni.getStorageSync('login_key').userId
// 		};
// 	   },
// 	   
// 	    onShow() {
// 	   	var _this = this;
// 	   	uni.request({
// 	   		url: 'http://localhost:8080/api/user/' + uni.getStorageSync('login_key').userId,
// 	   		method: 'GET',
// 	   		header: { 'content-type': 'application/json' },
// 	   		success: res => {
// 	   			if (res.data.code === 0) {
// 	   				console.log(res.data.data.avatar+'————————————');
// 	   				_this.avatar = res.data.data.avatar;
// 	   				_this.nickname = res.data.data.nickname;
// 	   			}
// 	   		}
// 	   	});
// 	   },
// 	   
// 	methods:{
// 		showActionSheet: function() {
// 			console.log('show');
// 			var _this = this;
// 			uni.showActionSheet({
// 				itemList: ['拍照', '从相册选择'],
// 				success: function(res) {
// 					console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
// 					//选择的是拍照功能
// 					if (res.tapIndex == 0) {
// 						uni.chooseImage({
// 							count: 1,
// 							sourceType: ['camera'],
// 							success: function(res) {
// 								uni.saveImageToPhotosAlbum({
// 									filePath: res.tempFilePaths[0],
// 									success: function() {
// 										console.log('save success');
// 										uni.uploadFile({
// 											url: 'http://localhost:8080/api/user/avatar', //仅为示例，非真实的接口地址
// 											filePath: res.tempFilePaths[0],
// 											name: 'file',
// 											formData: {
// 												userId: _this.userId
// 											},
// 											success: uploadFileRes => {
// 												console.log(uploadFileRes.data);
// 												_this.avatar = uploadFileRes.data;
// 											}
// 										});
// 									}
// 								});
// 							}
// 						});
// 					}
// 					//从相册选择
// 					if (res.tapIndex == 1) {
// 						uni.chooseImage({
// 							count: 1, //默认9
// 							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都
// 							sourceType: ['album'], //从相册选择
// 							success: function(res) {
// 								console.log(JSON.stringify(res.tempFilePaths));
// 								uni.uploadFile({
// 									url: 'http://localhost:8080/api/user/avatar', 
// 									filePath: res.tempFilePaths[0],
// 									name: 'file',
// 									formData: {
// 										userId: _this.userId
// 									},
// 									success: uploadFileRes => {
// 										console.log(uploadFileRes.data);
// 										_this.avatar = uploadFileRes.data;
// 									}
// 								});
// 							}
// 						});
// 					}
// 				},
// 				fail: function(res) {
// 					console.log(res.errMsg);
// 				}
// 			});
// 		}
// 	}
// };
// 	
// </script> -->

<!-- /* <style scoped>
	.one{
		display: flex;
		height: 40px;
		margin-top: 20px;
		align-content: center;
		border-bottom: 2px solid rgb(244,244,244);
	}
	.two{
		display: flex;
		height: 60px;
		align-content: center;
		border-bottom: 2px solid rgb(244,244,244);
	}
	.text1{
		margin-right: 30px;
		margin-left: 10px;
	}
	.text2{
		margin-right: 35px;
		margin-left: 10px;
		margin-top: 20px;
	}
	.text3{
		margin-left: 10px;
		
	}
	
</style> */ -->
