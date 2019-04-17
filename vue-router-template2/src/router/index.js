import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode:"history",
  routes: [
    {
      path: '/',
      redirect:'sign',
    },
		{
			// 注册登录
			path: '/sign',
			component: resolve => require(['../components/Sign.vue'], resolve),
			meta: {
				title: '注册登录'
			},
			children: [
				{
					path: '/sign_in',
					component: resolve => require(['../components/SignIn.vue'], resolve),
					meta: {
						title: '登录'
					},
				},
				{
					path: '/sign_up',
					component: resolve => require(['../components/SignUp.vue'], resolve),
					meta: {
						title: '注册'
					},
				}
			]
		}
		
  ]
})
