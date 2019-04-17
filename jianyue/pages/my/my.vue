
<template>
	<view class="container">
		<view class="top">
			<view class="avatar-box">
				<image src="../../static/default.png" mode="scaleToFill" class="avatar" v-if="!storageData.login"></image>
				<image :src="avatar" mode="scaleToFill" class="avatar" v-if="storageData.login"></image>
			</view>
			<view class="info-box">
				<view class="sign" v-if="!storageData.login">
					<navigator url="../signin/signin" class="btn">点击登录</navigator>
					<navigator class="signup" url="../signup/signup">新用户注册</navigator>
				</view>
				<text v-if="storageData.login" class="nname">{{nickname }}</text>
				<navigator v-if="storageData.login" url="../setting/setting" class="set">个人设置</navigator>
			</view>
		</view>
		<view class="grace-tab" style="margin-top:5px;" v-if="storageData.login">
			<scroll-view class="grace-tab-title" :scroll-x="true" :scroll-into-view="titleShowId">
				<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index"
				 @tap="tabChange" :key="index">{{tab.name}}</view>
			</scroll-view>
			<swiper class="grace-tab-swiper" :current="swiperCurrentIndex" @change="swiperChange" >
				<swiper-item class="wenzhang">
					<view class="list">
						<view class="list-item" v-for="(article, index) in articles" :key="index">
							<view class="list-item2">
							   <text @tap="gotoDetail(article.id)" class="title">{{ article.title }}</text>
							   <text  class="delete">删除</text>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="guanzhu">
					<view class="list_user">
						<view class="list_user-item" v-for="(follow, index) in follows" :key="index">
							<image :src="follow.avatar" class="touser_avatar"></image>
							<text class="touser_name">{{ follow.nickname }}</text>	
							<!-- <text class="cancelFollow">取关</text> -->
						</view>
					</view>
				</swiper-item>
				<swiper-item class="xiaoxi">
					收藏
				</swiper-item>
				<swiper-item class="jifen">
					积分
				</swiper-item>
			</swiper>
		</view>
		

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
						name: '文章',
						id: 'wenzhang'
					},
					{
						name: '关注',
						id: 'guanzhu'
					},
					{
						name: '收藏',
						id: 'shoucang'
					},
					{
						name: '积分',
						id: 'jifen'
					}
				],
				titleShowId: 'tabTag-0',
				avatar: uni.getStorageSync('login_key').avatar,
				nickname: uni.getStorageSync('login_key').nickname,
				storageData: {
					userId: 0,
					nickname: '',
					avatar: '',
					login: false
				},
				articles: [],
				follows: []
			};
		},
		onLoad: function() {},
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
					header: { 'content-type': 'application/x-www-form-urlencoded' },
					data: {
						uId: this.storageData.userId
					},
					success: res => {
						_this.articles = res.data.data;
					}
				});
				uni.request({
					url: this.apiServer + '/follow/list',
					method: 'GET',
					header: { 'content-type': 'application/x-www-form-urlencoded' },
					data: {
						fromUId: this.storageData.userId
					},
					success: res => {
						_this.follows = res.data.data;
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
			}
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

<style scoped>
	
	.avatar-box {
		text-align: center;
		margin-top: 10px;
	}

	.info-box {
		display: flex;
		font-size: 13px;
	}

	.nname {
		padding-left: 105px;
		margin-right: 20px;
	}

	.set {
		color: rgb(26, 173, 25);
	}

	.middle {
		display: flex;
		text-align: center;
	}

	.information {
		width: 70%;
		/* margin-right: 10px; */
		text-align: center;
		/* margin-left: 10px; */
		border-right: 1px solid #8F8F94;
	}

	.un {
		font-family: "黑体";
		font-size: 25px;
	}

	.text {
		font-size: 13px;
	}

	.bottom {
		margin-top: 20px;
	}

	.crt {
		margin-bottom: 30px;
		border-top: 1px solid #8F8F94;
		/* border-left-color: #8F8F94;
		border-left-width: 2px; */
	}

	.btn {
		margin-top: 20px;
		margin-left: 124px;
		color: rgb(26, 173, 25);
	}

	.signup {
		margin-top: 10px;
		margin-left: 120px;
		color: rgb(31, 199, 253);
		font-size: 13px;
	}
	.list-item{
		height: 50px;
		margin-right: 10px;
	}
	.list-item2{
		display: flex;
	}
	.title{
		line-height: 50px;
		font-size: 15px;
		font-weight: 500px;
		flex: 1 1 80%;
	}
	.delete{
		line-height: 50px;
		font-size: 13px;
		color: #FC6262;
		flex: 1 1 20%;
	}
	.list_user-item{
		margin-right: 10px;
		display: flex;
		border-bottom: 1px solid rgb(244,244,244);
	}
	.touser_avatar{
		margin-bottom: 2px;
		margin-top: 2px;
		height: 55px;
		width: 55px;
		border-radius: 50%;
	}
	.touser_name{
		margin-left: 15px;
		margin-top: 20px;
		font-size: 13px;
	}
	.cancelFollow{
		font-size: 15px;
		margin-top: 20px;
		color: #2FBF79;
		padding-left: 100px;
	}
</style>
