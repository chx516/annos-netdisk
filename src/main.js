import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from '@/store/index.js'
import '_a/styles/base.styl'
import '_a/styles/iconfont/iconfont.css'
import '_a/styles/iconfontCover.styl'
import '_a/styles/elementCover.styl'
import '_a/styles/mediaScreenXs.styl'
import '@/router/before.js'
import 'element-ui/lib/theme-chalk/index.css'

// import '../public/layui/modules/table.js'
// 引入全局函数
import globalFunction from '@/libs/globalFunction/index.js'
// 引入文件操作相关插件
import fileOperationPlugins from '@/plugins/fileOperationPlugins.js'
// 引入 Element UI 组件
import element from '@/plugins/element.js'
// 引入自定义的全局配置
import config from '@/config/index.js'

import uploader from 'vue-simple-uploader'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'


Vue.component(CollapseTransition.name, CollapseTransition)

Vue.config.productionTip = false

for (let key in globalFunction) {
  Vue.prototype[`$${key}`] = globalFunction[key]
}
for (let key in fileOperationPlugins) {
  Vue.prototype[`$${key}`] = fileOperationPlugins[key]
}

Vue.use(element)
Vue.prototype.$config = config
Vue.use(uploader)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
