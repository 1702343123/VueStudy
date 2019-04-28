<template>
	<view>
		<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title" :scroll-into-view="titleShowId">
			<view v-for="(tab, index) in tabs" :key="index" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index" @tap="tabChange">
			    {{tab.name}}
			</view>
		</scroll-view>
		<swiper class="grace-tab-swiper" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:'1000px'}">
			<swiper-item class="open">
				<view class="middle" style="height: 25px;background: rgb(248,248,248);">
					<text class="count" style="margin-left: 25px;line-height: 25px;font-size: 10px;color: #707070;letter-spacing: 1px;">{{articles.length}}篇文章</text>
				</view>
				<view class="list">
					<view class="list-item" scroll-x v-for="(article, index) in articles" :key="index" style="height: 80px" >
						<view class="list-item2" @tap="gotoDetail(article.id)">
						   <text class="title" style="line-height: 80px;font-size: 17px;margin-left: 25px;">{{ article.title }}</text>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="personal">
				<view class="middle" style="height: 25px;background: rgb(248,248,248);">
					<text class="count" style="margin-left: 25px;line-height: 25px;font-size: 10px;color: #707070;letter-spacing: 1px;">0篇文章</text>
				</view>
				<view class="list">
					<view class="list-item">
						<text >私密文章</text>	
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	var loginRes, _self;
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabs: [{
						name: '公开文章',
						id: 'open'
					},
					{
						name: '私密文章',
						id: 'personal'
					}
				],
				titleShowId: 'tabTag-0',
				storageData: {
					userId: 0,
					nickname: '',
					avatar: '',
					login: false
				},
				articles: []
			};
		},
		onLoad: function() {
			// _self = this;
		},
		onShow: function() {
			var _this = this;
			const loginKey = uni.getStorageSync('login_key');
			if (loginKey) {
				console.log(loginKey);
				this.storageData = {
					login: loginKey.login,
					nickname: loginKey.nickname,
					avatar: loginKey.avatar,
					userId: loginKey.userId
				};
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
						}
					}
				});
				uni.request({
					url: this.apiServer + '/article/user',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						uId: this.storageData.userId
					},
					success: res => {
						_this.articles = res.data.data;
					}
				});
			} else {
				this.storageData = {
					login: false
				};
			}

		},
		methods: {
			tabChange: function(e) {
				var index = e.target.id.replace('tabTag-', '');
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			gotoDetail: function(aId) {
				uni.navigateTo({
					url: '../article_detail/article_detail?aId=' + aId + '&userId=' + this.storageData.userId
				});
			},
		},
	};
</script>

<style scoped>
	
</style>
