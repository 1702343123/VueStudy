<template>
	<view class="container">
		<view class="article" v-for="(article,index) in articles" :key="index">
			<!-- 标题 -->
			<view class="title">
				<text class="article-title" @tap="gotoDetail(article.id)">{{article.title}}</text>
			</view>
			<!-- 大于等于三张图片的显示方式 -->
			<view class="one" v-if="article.imgs.length >= 3">
				<view class="thumbnail-box">
					<view class="thumbnail-item" v-for="(item,index1) in article.imgs" :key="index1">
						<image :src="item.imgUrl" class="img"></image>
					</view>
				</view>
			</view>
			<!-- 小于三种图片的显示方式 -->
			<view class="two" v-else-if="article.imgs.length>= 1">
				<view class="text-img-box">
					<view class="left">
						<text>{{handleContent(article.content)}}</text>
					</view>
					<view class="right">
						<image :src="article.imgs[0].imgUrl" class="img"></image>
					</view>
				</view>
			</view>
			<!-- 没有图片的显示方式 -->
			<view class="text-box" v-else>
				<text>{{handleContent(article.content)}}</text>
			</view>
			<!-- 文章作者等信息 -->
			<view class="article-info">
				<image :src="article.avatar" class="avatar1"></image>
				<text class="info-text">{{article.nickname}}</text>
				<text class="info-text">{{article.createTime}}</text>
			</view>
		</view>
		<navigator url="../write/write" hover-class="navigator-hover">
			<image src="../../static/newarticle.png" class="new"></image>
			<!-- <button class="circle-btn">
				<image src="../../static/jia.png" class="icon-jia"></image>
			<text class="icon-text">+</text>
			</button> -->
		</navigator>
		<!-- <view>
			<navigator url="../write/write">
				<image src="../../static/newarticle.png"></image>
			</navigator>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articles: []
			}
		},
		onLoad: function() {
			this.getArticles();
		},
		onShow: function() {},
		onPullDownRefresh: function() {
			this.getArticles();
		},
		methods: {
			getArticles: function() {
				var _this = this;
				uni.request({
					url: this.apiServer + '/article/list',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						_this.articles = res.data.data;
					},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				});
			},
			gotoDetail: function(aId) {
				uni.navigateTo({
					url: '../article_detail/article_detail?aId=' + aId
				});
			},
			handleContent: function(content) {
				content = content.replace(/(\n)/g, "");
				content = content.replace(/(\t)/g, "");
				content = content.replace(/(\r)/g, "");
				content = content.replace(/<\/?[^>]*>/g, "");
				content = content.replace(/\s*/g, "");
				return content.substring(0, 50);
			},
		},
		filters: {
			formatDateTime: function(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				var second = date.getSeconds();
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			},
		}
	};
</script>
<style>
	.container {
		margin-top: 5px;
	}

	.article {
		border: 1px solid rgb(238, 238, 238);
		border-radius: 6px;
		margin-bottom: 7px;
	}

	.article-title {
		font-weight: 700;
		font-size: 15px;
	}

	.thumbnail-box {
		display: flex;
		width: 100%;
		height: 80px;
	}

	.thumbnail-item {
		flex: 1 1 33%;
	}

	.title {
		margin-bottom: 5px;
	}

	.img {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.article-info {
		margin-top: 5px;
		display: flex;
		height: 40px;
	}

	.avatar1 {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 5px;
		justify-content: center;
	}

	.info-text {
		margin-right: 10px;
		line-height: 40px;
		color: #888888;
	}

	.text-img-box {
		display: flex;
		width: 100%;
		height: 100px;
	}

	.left {
		flex: 1 1 60%;
	}

	.right {
		flex: 1 1 40%;
	}
	.new{
		position: fixed;
		bottom: 70px;
		right: 20px;
		width: 45px;
		height: 45px;
		box-shadow: 2px 5px 10px #B2B2B2;
		cursor: pointer;
		border: none;
		outline: none;
		border-radius: 50%;
	}

	.circle-btn {
		position: fixed;
		bottom: 70px;
		right: 20px;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background-color: #de533a;
		background: linear-gradient(40deg, #ffd86f, #fc6262);
		box-shadow: 2px 5px 10px #D1D1D1;
		cursor: pointer;
		border: none;
		outline: none;
		/* display: flex; */
		/* justify-content: center; */
		/* align-items: center; */
	}
	.icon-jia{
		width: 35px;
		height: 35px;
		/* position: fixed; */
		line-height: 44px;
		margin-top: 5px;
		align-items: center;
		/* padding-right: 60px; */
		justify-content: center;
	}

	.icon-text {
		font-size: 15pt;
		color: #fff;
		line-height: 44px;
		justify-content: center;
		/* margin-bottom: 8px; */
	}
</style>
