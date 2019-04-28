<template>
	<view class="all">
		<view class="top">
			<view class="left" style="margin-left: 15px;flex: 1 1 80%;">
				<image src="../../static/扫一扫.png" style="width: 15px;height: 15px;"></image>
			</view>
			<view class="right" style="flex: 1 1 20%;">
				<image src="../../static/夜晚月亮.png" style="width: 15px;height: 15px;"></image>
				<text style="font-size: 10px;color: #707070;margin-left: 1px;">日间</text>
			</view>
		</view>
		<view class="info">
			<view class="avatar-box">
				<image src="../../static/default.png" mode="scaleToFill" class="avatar" v-if="!storageData.login"></image>
				<image :src="avatar" mode="scaleToFill" class="avatar" v-if="storageData.login"></image>
			</view>
			<view class="name-box" v-if="!storageData.login" >
				<text style="font-size: 17px;" @tap="gotoSignin()">点击登录</text></br>
				<text style="color: #707070;size: 10px;">关注&nbsp;0</text>
			</view>
			<view class="name-box" v-if="storageData.login" style="display: flex;">
				<view style="flex: 1 1 70%;">
					<text style="font-size: 17px;">{{nickname}}</text></br>
					<text style="color: #707070;size: 10px;" @tap="gotoMyfollows()">关注&nbsp;{{follows.length}}</text>
				</view>
				<view style="flex: 1 1 30%;" v-if="!guanzhu">
					<text style="color: rgb(234,111,90);font-size: 16px;line-height: 50px;letter-spacing: 2px;" @tap="showBanner">签到</text>
				</view>
				<graceMaskView :show="show" v-on:close="closeBanner" style="text-align: center;">
					<view>
						<image src="../../static/签到.png" style="height: 50px;width: 50px;margin-top: 20px;"></image>
					</view>
					<view>
						<text style="margin-top: 20px;color: rgb(234,111,90);font-weight: 1000;font-size: 18px;">签到成功</text>
					</view>
					<view style="height: 20px;"></view>
				</graceMaskView>
				<view style="flex: 1 1 30%;" v-if="guanzhu">
					<text style="color: #707070;font-size: 16px;line-height: 50px;letter-spacing: 2px;">已签到</text>
				</view>
			</view>
		</view>
		<view class="middle">
			<view class="one">
				<image src="../../static/金币.png" style="height: 30px;width: 30px;"></image>
				<text style="margin-left: 5px;margin-right: 150px;">简阅钻:&nbsp;0</text>
				<text style="font-size: 10px;color: #707070;">查看</text>
				<text style="margin-left: 5px;color: #707070;">></text>
			</view>
			<view class="two">
				<view class="grace-box-banner">
					<view class="garce-items" @tap="gotoMyarticles()">
						<view class="line1">
							<image class="two-img" src="../../static/文章1.png" />
						</view>
						<view class="line2">我的文章</view>
					</view>
					<view class="garce-items" @tap="gotoMyfollows()">
						<view class="line1">
							<image class="two-img" src="../../static/关注.png" />
						</view>
						<view class="line2">我的关注</view>
					</view>
					<view class="garce-items">
						<view class="line1">
							<image class="two-img" src="../../static/收藏_.png" />
						</view>
						<view class="line2">赞和收藏</view>
					</view>
					<view class="garce-items">
						<view class="line1">
							<image class="two-img" src="../../static/任务管理.png" />
						</view>
						<view class="line2">奖励任务</view>
					</view>
				</view>
			</view>
		</view>
		<view class="guanggao" style="margin-top: 20px;">
			<image :src="now" class="guanggao1-img"></image>
		</view>
		<view class="grace-list">
			<view class='items'>
				<view class="title">简书会员<text >限时赠简书钻</text></view>
				<view class="icons icon-r">
				  <image src="/imgs/logo.png" mode="widthFix"></image>
				</view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">简书活动<text>万元奖金等你</text></view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">简东西<text>简书人都爱买</text></view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">我的钱包<text>0张优惠劵</text></view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">我的专题/文集</view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">浏览历史</view>
				<view class="arrow-right"></view>
			</view>
		</view>
		<view style="height: 15px;background: rgb(219,217,216);"></view>
		<view class="grace-list grace-bg-white ">
			<view class='items' @tap="gotoSetting()">
				<view class="title">设置</view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">
				  帮助与反馈
				  <text>有问题找这里</text>
				</view>
				<view class="arrow-right"></view>
			</view>
		</view>
		<view style="height: 15px;background: rgb(219,217,216);"></view>
	</view>
</template>

<!-- <template>
	<view class="container">
		<view class="top">
			<view class="avatar-box">
				<image src="../../static/default.png" mode="scaleToFill" class="avatar" v-if="!storageData.login"></image>
				<image :src="avatar" mode="scaleToFill" class="avatar" v-if="storageData.login"></image>
			</view>
			<view class="info-box">
				<view class="sign" v-if="!storageData.login">
					
					<navigator url="../signin/signin" class="btn">点击登录</navigator>
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
</template> -->

<script>
	import graceMaskView from "../../graceUI/components/graceMaskView.vue";
	import graceSpeaker from "../../graceUI/components/graceSpeaker.vue";
	var loginRes, _self;
	export default {
		data() {
			return {
				pic: [
					"../../static/lufei06.jpg",
					"../../static/lufei07.jpg",
					"../../static/lufei08.jpg",
					"../../static/lufei09.jpg"
				],
				i:0,
				now: "../../static/lufei06.jpg",
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
				// aId: uni.getStorageSync('login_key').aId,
				storageData: {
					userId: 0,
					nickname: '',
					avatar: '',
					login: false
				},
				articles: [],
				follows: [],
				gunazhu:false,
				staticUrl: this.staticUrl,
				show : false,
			};
		},
		mounted: function() {
			this.now = this.pic[0];
			var _this = this;
			setInterval(function() {
				_this.i++;
				_this.now = _this.pic[_this.i];
				if (_this.i >= _this.pic.length - 1) {
					_this.i = 0;
				}
			}, 5000);
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
				uni.request({
					url: this.apiServer + '/follow/list',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
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
		components: {
			graceSpeaker
		},
		methods: {
			// 			deleteArticle: function() {
			// 				uni.request({
			// 					url: this.apiServer + '/article/delete',
			// 					method: 'POST',
			// 					header: {
			// 						'content-type': 'application/x-www-form-urlencoded'
			// 					},
			// 					data: {
			// 						
			// 					},
			// 					success: res => {
			// 						if (res.data.code === 0) {
			// 							uni.showToast({
			// 								title: '文章已删除'
			// 							});
			// 							this.followed = false;
			// 						}
			// 					}
			// 				});
			// 			},
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
			gotoSignin:function(){
				uni.navigateTo({
					url:'../signin/signin'
				});
			},
			gotoMyarticles:function(){
				uni.navigateTo({
					url:'../myarticles/myarticles'
				});
			},
			gotoMyfollows:function(){
				uni.navigateTo({
					url:'../myfollows/myfollows'
				});
			},
			gotoSetting:function(){
				uni.navigateTo({
					url:'../setting/setting'
				});
			},
			showBanner : function(){
				this.show = true;
				this.guanzhu=true;
			},
			closeBanner : function(){
				this.show = false;
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
		},
		components :{
			graceMaskView
		}
};
</script>

<style scoped>
	.top {
		/* position: fixed; */
		margin-top: 5px;
		margin-right: 15px;
		width: 100%;
		height: 30px;
		display: flex;
		line-height: 30px;
		background: #ffffff;
		/* position: fixed;
		margin-top: 5px;
		width: 100%;
		height: 15px;
		display: flex;
		line-height: 15px; */
	}

	.info {
		margin-top: 10px;
		display: flex;
		height: 50px;
	}

	.avatar-box {
		margin-left: 15px;
		flex: 1 1 20%;
	}

	.name-box {
		flex: 1 1 80%;
		/* margin-left: 5px; */
		line-height: 25px;
	}

	.middle {
		margin-top: 15px;
		/* height: 70px; */
		width: 90%;
		margin-left: 15px;
		box-shadow: 2px 2px 2px 2px #8a8a8a;
		border: none;
		border-radius: 5px;
	}

	.one {
		display: flex;
		border-bottom: 0.5px solid #707070;
		margin-left: 10px;
		margin-right: 10px;
		height: 30px;
		line-height: 30px;
	}

	.two-img {
		height: 40px;
		width: 40px;
	}
	.guanggao1-img{
		border-radius: 5px;
		height: 50px;
		width: 90%;
		margin-left: 15px;
	}

	/* .info-box {
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
		
		text-align: center;
		
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
	} */
</style>
