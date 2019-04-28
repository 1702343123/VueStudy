<template>
	<view>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view style="padding:200rpx 15%;">
				<button type="primary" @tap="showBanner">点击签到</button>
				<!-- <button type="primary" @tap="showBanner2" style="margin:15px 0;">打开弹出层演示2</button> -->
			</view>
		</view>
		<graceMaskView :show="show" v-on:close="closeBanner">
			<!-- <view>
				<image :src="staticUrl + 'banner-gui.png'" style="width:100%; margin-top:25px; border-top-right-radius:5px; border-top-left-radius:5px;" mode="widthFix"></image>
			</view> -->
			<view style="padding:25px; padding-bottom:30px;">
				<text class="text" style="padding:90px 90px;font-weight: 500;font-size: 20px;">签到成功</text>
				<!-- <button type='warn' style="background:#F6644D; padding:0 20px;">一个按钮</button> -->
			</view>
		</graceMaskView>
		<view class="b" type="primary">
			<span v-show="show3" @click="getCode()"  class="text">获取验证码</span>
			<span v-show="!show3"  class="count">{{count}}s&nbsp;后重新获得</span>
		</view>
		
		
		
		<graceHeader title="滚动操作" desc="请在下面的项目上左右滑动"></graceHeader>
		<view>
			<view class="grace-scroll-do grace-bg-white grace-common-mt">
				<scroll-view class="grace-scroll-x" scroll-x v-for="(item, index) in msg" :scroll-left="scrollIndex == index ? 180 : 0" @touchstart='touchStart' @touchend='touchEnd' :data-id="index" scroll-with-animation="true" :key="index">
					<view class="grace-items">
						<image :src="item.img" mode="widthFix"></image>
						<view class="contents">
							<view class="grace-h5 grace-blod">{{item.title}}</view>
							<view class="grace-text-small">{{item.desc}}</view>
						</view>
					</view>
					<!-- <view class="grace-items btn btn-first" :data-id="index" @tap="changStatus" :style="{width : index == deleteIndex ? '0px' : btn1Width + 'px', background:item.status == '已读' ? '#CCCCCC' : '#5959D3', color:item.status == '已读' ? '#999' : '#FFF'}">{{item.status}}</view> -->
					<view class="grace-items btn" :data-id="index" @tap="removeMsg" :style="{width : index == deleteIndex ? deleteBtnWidth + 'px' : btn2Width+'px'}">删除</view>
				</scroll-view>
			</view>
		</view>
		
	</view>

</template>

<script>
	var loginRes, _self;
	var _self, x, y;
	import graceMaskView from "../../graceUI/components/graceMaskView.vue";
	export default {
		data() {
			return {
				//2个按钮的宽度
				btn1Width : 70,
				btn2Width : 70,
				//2个按钮的总宽 = btn1Width + btn23Width【uni-app 模板内不建议复杂运算请手动配置】
				deleteBtnWidth : 140,
				//正在滑动的索引
				scrollIndex : -1,
				//正在删除的索引
				deleteIndex : -1,
				//模拟数据
				msg : [
					//img - 图片地址 title - 标题 desc - 描述 - status 读取状态
					{ img: '../../static/lufei09.jpg', title: "graceUI", desc: '兼容小程序、uni-app的优秀前端UI', status:"未读"},
					{ img: '../../static/lufei09.jpg', title: "uni-app", desc: 'uni-app 终极跨平台解决方案', status:"未读"},
					{ img: '../../static/lufei09.jpg', title: "hcoder", desc: '专业IT教程', status:"未读"}
				],
				staticUrl: this.staticUrl,
				show : false,
				show2 : false,
				show3: true,
				count: '',
				timer: null,
				mobile: '',
				verifyCode: '',
			}
		},
		onLoad : function(){
			_self = this;
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
		methods:{
			getCode() {
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show3 = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show3 = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
			// 第1个演示 开启与关闭
			showBanner : function(){
				this.show = true;
			},
			closeBanner : function(){
				this.show = false;
			},
			// 第2个演示 开启与关闭
			showBanner2 : function(){
				this.show2 = true;
			},
			closeBanner2 : function(){
				this.show2 = false;
			},
			tap2 : function(){
				uni.showToast({
					title:"您点击了红包图片",
					icon:"none"
				})
			},
			removeMsg : function(e){
				var index = e.target.dataset.id;
				//删除确认
				if (this.deleteIndex != index){
					this.deleteIndex = index;
					setTimeout(function(){
						_self.deleteIndex = -1;
					}, 2000);
					return false;
				}
				this.scrollIndex = -1;
				setTimeout(function(){
					_self.msg.splice(index, 1);
					_self.deleteIndex = -1;
				}, 500);
			},
			touchStart: function (e) {
				x = e.mp.changedTouches[0].clientX;
				y = e.mp.changedTouches[0].clientY;
			},
			touchEnd : function(e){
				x = x - e.mp.changedTouches[0].clientX;
				y = y - e.mp.changedTouches[0].clientY;
				if (Math.abs(x) < 50) { return; }
				if (Math.abs(x) < Math.abs(y)) { return; }
				var index = e.currentTarget.dataset.id;
				if (index == this.scrollIndex){return ;}
				_self.scrollIndex = index;
			},
			changStatus : function(e){
				var index = e.currentTarget.dataset.id;
				this.msg[index].status = "已读";
			},
			
		},
		components :{
			graceMaskView
		}
	}
</script>

<style scoped>
	
</style>
