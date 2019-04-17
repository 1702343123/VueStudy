<template>
	<view class="container">
		<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
			<view v-for="(tab, index) in tabs" :key="index" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-' + index" @tap="tabChange">
				{{ tab.name }}
			</view>
		</scroll-view>
		<swiper class="grace-tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange" :style="{ height: tabHeight + 'px' }">
			<!-- 循环新闻项目 -->
			<swiper-item v-for="(news, newsIndex) in newsAll" :key="newsIndex">
				<scroll-view scroll-y="true" :data-scindex="newsIndex" @scrolltolower="scrollend">
					<view class="grace-news-list" style="padding:25upx; width:700upx;">
						<navigator v-for="(item, index) in news" :key="index">
							<view class="grace-news-list-items">
								<view class="grace-news-list-title">
									<view class="grace-news-list-title-main">标题 [ {{ index }} ]</view>
									<text class="grace-news-list-title-desc grace-text-overflow">描述</text>
								</view>
							</view>
						</navigator>
					</view>
					<graceLoading :loadingType="tabs[newsIndex].loadingType"></graceLoading>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
var _self;
var news = [
	{ title: '新闻标题', desc: '新闻描述...' },
	{ title: '新闻标题', desc: '新闻描述...' },
	{ title: '新闻标题', desc: '新闻描述...' },
	{ title: '新闻标题', desc: '新闻描述...' },
	{ title: '新闻标题', desc: '新闻描述...' },
	{ title: '新闻标题', desc: '新闻描述...' },
	{ title: '新闻标题', desc: '新闻描述...' },
	{ title: '新闻标题', desc: '新闻描述...' },
	{ title: '新闻标题', desc: '新闻描述...' },
	{ title: '新闻标题', desc: '新闻描述...' }
];
//对应下面3个标签的新闻内容数据
var newsAll = [news, news, news];
import graceLoading from '../../graceUI/components/graceLoading.vue';
export default {
	data() {
		return {
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			tabHeight: 300,
			tabs: [
				//标签名称 , 分类 id , 加载更多, 加载的页码
				{ name: '关注', id: 'guanzhu', loadingType: 0, page: 1 },
				{ name: '推荐', id: 'tuijian', loadingType: 0, page: 1 },
				{ name: '体育', id: 'tiyu', loadingType: 0, page: 1 }
			],
			newsAll: newsAll
		};
	},
	onLoad: function() {
		_self = this;
	},
	onReady: function() {
		//获取屏幕高度及比例
		var winInfo = uni.getSystemInfo({
			success: function(res) {
				var windowHeight = res.windowHeight;
				//获取头部标题高度
				var dom = uni.createSelectorQuery().select('#grace-tab-title');
				dom.fields({ size: true }, res2 => {
					if (!res2) {
						return;
					}
					//计算得出滚动区域的高度
					_self.tabHeight = windowHeight - res2.height;
				}).exec();
			}
		});
	},
	methods: {
		tabChange: function(e) {
			var index = e.target.id.replace('tabTag-', '');
			this.swiperCurrentIndex = index;
			this.tabCurrentIndex = index;
		},
		swiperChange: function(e) {
			var index = e.detail.current;
			this.tabCurrentIndex = index;
		},
		//每个选项滚动到底部
		scrollend: function(e) {
			//获取是哪个选项滚动到底？
			var index = e.currentTarget.dataset.scindex;
			console.log(index);
			//可以利用 tabs 携带的分类id 与服务器交互请求对应分类的数据
			console.log(this.tabs[index].id);
			//加载更多的演示
			//判断当前是否正在加载
			if (this.tabs[index].loadingType === 1) {
				return false;
			}
			//判断是否是最后一页
			console.log(this.tabs[index].page);
			if (this.tabs[index].page > 3) {
				this.tabs[index].loadingType = 2; //全部
				return;
			}
			this.tabs[index].loadingType = 1; //加载中
			//模拟延迟
			setTimeout(function() {
				_self.newsAll[index] = _self.newsAll[index].concat(news);
				//分页
				_self.tabs[index].page++;
				_self.tabs[index].loadingType = 0; //恢复加载状态
				//
			}, 1000);
		}
	},
	components: {
		graceLoading
	}
};
</script>

<style></style>
