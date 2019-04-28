<template>
	<view>
		<view class="one">
			<navigator class="list-title">消息推送</navigator>
			<view class="grace-list grace-common-mt">
				<navigator class="items" v-for="(item, index) in list1s" :key="index" :url="'../'+item.path+'/'+item.path">
					<view class="title">{{item.title}}<text>{{item.desc}}</text></view>
				</navigator>
			</view>
			<navigator class="list-title">通用设置</navigator>
			<view class="grace-list grace-common-mt">
				<navigator class="items" v-for="(item, index) in list2s" :key="index" :url="'../'+item.path+'/'+item.path">
					<view class="title">{{item.title}}<text>{{item.desc}}</text></view>
				</navigator>
			</view>
			<navigator class="list-title">其他</navigator>
			<view class="grace-list grace-common-mt">
				<navigator class="items" v-for="(item, index) in list3s" :key="index" :url="'../'+item.path+'/'+item.path">
					<view class="title">{{item.title}}<text>{{item.desc}}</text></view>
				</navigator>
			</view>
		</view>
		<view style="width:100%; margin-top:10px;margin-bottom: 20px;">
			<button class="btnone" @tap="logout">退出当前账号</button>
		</view>
	</view>
</template>
<script>
var _self;
import graceHeaderLineForApp from "../../graceUI/components/graceHeaderLineForApp.vue";
export default{
	data() {
		return {
			staticUrl : this.staticUrl,
			list1s: [
				{ title: '文章更新推送', path: "", desc: "已开启" },
				{ title: '新消息推送', path: "", desc: " " }
			],
			list2s: [
				{ title: '编辑个人资料', path: "user_info", desc: " " },
				{ title: '默认编辑器', path: "", desc: "富文本" },
				{ title: '添加写文章到桌面', path: "", desc: " " },
				{ title: '赞赏设置', path: "", desc: " " },
				{ title: '字号设置', path: "", desc: " " },
				{ title: '隐私设置', path: "", desc: " " },
				{ title: '移动网络下加载图片', path: "", desc: " " },
			],
			list3s: [
				{ title: '回收站', path: "", desc: " " },
				{ title: '关于我们', path: "", desc: " " }
			],
		}
	},
	onLoad:function(){
		uni.setNavigationBarTitle({
			title: '设置'
		});
	},
	components:{
		graceHeaderLineForApp
	},
	methods: {
		logout: function() {
			console.log('log out');
			uni.removeStorageSync('login_key');
			uni.showToast({
				title: '已经退出当前账号'
			});
			uni.navigateBack();
		}
	}
}
</script>
<style>
.list-title{
	color: rgb(234,111,90);
	margin-left: 20px;
	margin-top: 20px;
	font-size: 13px;
}
.title{
}
.btnone{
	border:1px solid rgb(234,111,90) !important; 
	background:none !important; 
	color:rgb(234,111,90) !important; 
	width:180px; 
	height:90upx; 
	line-height:90upx;
	font-size:40upx !important;
	letter-spacing:3px;
}
</style>



<!-- <template>
	<view class="container">
		<view class="list">
			<view class="list-item"><text>文章推送</text></view>
			<view class="list-item"><text>新消息推送</text></view>
			<view class="list-item">
				<navigator url="../user_info/user_info">
					个人资料
                </navigator>
			</view>
			<view class="list-item">
				<button type="primary" @tap="logout">退出当前账号</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '设置'
		});
	},
	methods: {
		logout: function() {
			console.log('log out');
			uni.removeStorageSync('login_key');
			uni.showToast({
				title: '已经退出当前账号'
			});
			uni.navigateBack();
		}
	}
};
</script>

<style >
	
</style> -->
