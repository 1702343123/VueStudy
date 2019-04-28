<template>
	<view>
		<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title" :scroll-into-view="titleShowId">
			<view v-for="(tab, index) in tabs" :key="index" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index" @tap="tabChange">
			    {{tab.name}}
			</view>
		</scroll-view>
		<swiper class="grace-tab-swiper" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:'1000px'}">
			<swiper-item class="yonghu">
				<view class="list">
					<view class="list_user">
						<view class="list_user-item" v-for="(follow, index) in follows" :key="index" style="display: flex;height: 50px;line-height: 50px;border-bottom: 1px solid rgb(244,244,244);margin-left: 25px;margin-right: 25px;">
							<image :src="follow.avatar" class="touser_avatar" style="height: 50px;width: 50px;border-radius: 50%;"></image>
							<text class="touser_name" style="font-size: 18px;margin-left: 10px;flex: 1 1 40%;">{{ follow.nickname }}</text>
							<button class="btn" >已关注</button>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="zhuanti">
				<view class="list">
					<view class="list-item">
						<text >暂无</text>	
					</view>
				</view>
			</swiper-item>
			<swiper-item class="wenji">
				<view class="list">
					<view class="list-item">
						<text >暂无</text>	
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
						name: '用户',
						id: 'yonghu'
					},
					{
						name: '专题',
						id: 'zhuanti'
					},
					{
						name: '文集',
						id: 'wenji'
					}
				],
				titleShowId: 'tabTag-0',
				storageData: {
					userId: 0,
					nickname: '',
					avatar: '',
					login: false
				},
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
			}
		}
	};
</script>

<style scoped>
	.btn{
		height: 26px;
		/* width: 50px; */
		font-size: 15px;
		line-height: 26px;
		margin-top: 13px;
		border:1px solid rgb(248,248,248) !important; 
		color: rgb(234,111,90);
		background:none !important; 
		letter-spacing: 1px;
	}
</style>