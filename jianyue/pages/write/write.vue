<template>
	<view class="container">
		<!-- 文章标题输入框，和title变量绑定 -->
		<view class="input-title">
			<input type="text" v-model="title" placeholder="请输入标题"/>
		</view>
		<!-- 选择图片的按钮，点击触发chooseImg方法 -->
		<!-- <button class="add-btn" @tap="chooseImg">+图片</button> -->
		<!-- 文章内容输入的多行文本域，绑定content变量 -->
		<textarea placeholder="输入内容" v-model="content" class="content" style="margin-left: 5px;"/>
		<view class="yulan" >
			<text style="font-size: 15px;color: #707070;">预览</text>
		</view>
		<!-- 使用graceUI的富文本解析功能，来预览文章内容 -->
		<view class="grace-text" style="margin-left: 5px;">
			<rich-text :nodes="title" bindtap="tap" style="font-size: 17px;font-family: '黑体';"></rich-text>
			<rich-text :nodes="content" bindtap="tap"></rich-text>
		</view>
		<!-- <image src="../../static/图片选中 (2).png" @tap="chooseImg" style="height: 50px;width: 50px;"></image> -->
		<!-- <button class="green-btn" @tap="postArticle">发布文章</button> -->
		<!-- 底部导航 -->
		<view class="grace-footer" style="top:100upx;box-shadow:2px 2px 2px #E9E9E9;">
			<view  class="grace-nowrap">
				<view class="icons grace-iconfont">
					<image @tap="chooseImg" src="../../static/图片选中%20(2).png" style="height: 30px;width: 30px;margin-left: 10px;"></image>
				</view>
				
			</view>
			<view >
				<view >
					<text @tap="postArticle" style="font-size: 15px;margin-left: 240px;line-height: 40px;color: rgb(234,111,90);letter-spacing: 2px;">发布</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
	        return {
			title: '',
			content: '',
			userId: uni.getStorageSync('login_key').userId,
			imgs: []
		};
		},
		methods:{
			//选择图片上传
			chooseImg:function(){
		        var _this = this;
			    uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],
				success: function(res) {
					console.log(JSON.stringify(res.tempFilePaths));
					uni.uploadFile({
						url: _this.apiServer + '/avatar/upload',
						filePath: res.tempFilePaths[0],
						name: 'file',
						success: uploadFileRes => {
							//图片上传成功，回显图片地址
							console.log(uploadFileRes.data);
							//将图片地址加入imgs数组
							_this.imgs.push(uploadFileRes.data);
							//将图片地址拼接HTML标签，加入文章内容
							_this.content += '<img src="' + uploadFileRes.data + '" width = "100%"/>';
						}
					});
				}
			});
			},
			// 发布文章
			postArticle:function(){
				if(this.title.length===0){
					uni.showToast({ 
						title: '文章标题不能为空！', icon : "none",
						});
				}else{
					var _this = this;
					    uni.request({
						url: this.apiServer + '/article/add',
						method: 'POST',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						data: {
							uId: this.userId,
							title: this.title,
							content: '<div>' + this.content + '</div>'
						},
						success: res => {
							if (res.data.code === 0) {
								//获得发布文章成功返回的文章id
								var aId = res.data.data;
								console.log(aId);
								uni.showToast({
									title: '发布成功'
								});
								//将文章id和文章对应的图片地址数组传到后台，存入数据库
								uni.request({
									url: this.apiServer + '/img/add',
									method: 'POST',
									header: { 'content-type': 'application/x-www-form-urlencoded' },
									data: {
										aId: aId,
										imgs: JSON.stringify(_this.imgs)  //序列化imgs数组
									},
									success: res => {
										if (res.data.code === 0) {
											console.log('文章图片地址已写入数据库');
										}
									}
								});
								uni.switchTab({
									url: '../index/index'
								});
							}
						}
					});
				}
				
			}
		}
	}
</script>

<style scoped>
	.input-title{
		margin-top: 55px;
		margin-left: 5px;
		height: 30px;
		font-size: 17px;
		font-family: '黑体';
		margin-bottom: 10px;
		border-bottom:1px dashed #707070;
	}
</style>
