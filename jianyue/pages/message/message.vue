<template>
	<view>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view style="padding:200rpx 15%;">
				<button type="primary" @tap="showBanner">点击签到</button>
				<!-- <button type="primary" @tap="showBanner2" style="margin:15px 0;">打开弹出层演示2</button> -->
			</view>
		</view>
		<graceMaskView :show="show" bgcolor="#00C777" v-on:close="closeBanner">
			<!-- <view>
				<image :src="staticUrl + 'banner-gui.png'" style="width:100%; margin-top:25px; border-top-right-radius:5px; border-top-left-radius:5px;" mode="widthFix"></image>
			</view> -->
			<view style="padding:25px; padding-bottom:30px;">
				<text class="text" style="padding:90px 90px;font-weight: 500;font-size: 20px;">签到成功</text>
				<!-- <button type='warn' style="background:#F6644D; padding:0 20px;">一个按钮</button> -->
			</view>
		</graceMaskView>
	</view>

</template>

<script>
	import graceMaskView from "../../graceUI/components/graceMaskView.vue";
	export default {
		data() {
			return {
				staticUrl: this.staticUrl,
				show : false,
				show2 : false
			}
		},
		methods:{
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
			}
		},
		components :{
			graceMaskView
		}
	}
</script>

<style scoped>
	
</style>
