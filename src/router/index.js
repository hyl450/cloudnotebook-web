import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import Home from '@/views/home/NoteBookHome'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons' // icon

Vue.use(ElementUI)
Vue.use(Router)

export const constantRouterMap = [
  {path: '/', name: 'login', component: Login},
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

export default new Router({
  routes: constantRouterMap
  // routes: [
  //   {
  //     path: '/',
  //     name: 'HelloWorld',
  //     component: HelloWorld
  //   }
  // ]
})
