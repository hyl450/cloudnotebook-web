import Vue from 'vue'
import App from './App'
import router from './router'
import '@/icons' // icon
import store from './store'
/*引入公共样式*/
import '../static/css/icon.css'
import "../static/css/main.css"
import "../static/css/prettify.css"
import "../static/css/umeditor.min.css"


//Ueditor编辑器JS
// import "@/views/css/umeditor.min.css"
import jQuery from './store/jquery.min.js'
import './store/jquery.min.js'
import '../static/js/umeditor.config.js'
import '../static/js/umeditor.min.js'
import '../static/js/lang/zh-cn.js'
import '../static/js/theme-setup.js'

// import "../static/css/login.css"
// import "../static/css/login_ghost.css"

// import 'bootstrap/js/modal.js'
// import 'bootstrap/js/dropdown.js'
// import 'bootstrap/js/tooltip.js'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'font-awesome/css/font-awesome.css'
// import 'summernote'
// import 'summernote/dist/lang/summernote-zh-CN.js'
// import 'summernote/dist/summernote.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
