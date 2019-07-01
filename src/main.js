// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'
import {ToastPlugin,Toast,Swiper,XProgress,SwiperItem} from 'vux'
// import layer from 'vue-layer'
// Vue.prototype.$layer = layer(Vue);
Vue.config.productionTip = false;
//测试环境
Vue.use(ToastPlugin);
//测试环境
// Vue.prototype.baseUrl="47.93.234.167:31999";
//正式环境
Vue.prototype.baseUrl="60.205.216.141";
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

