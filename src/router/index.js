import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'
import Word from '@/components/Word'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list/:keyword',
      name: 'list',
      component: List
    },
    {
      path: '/word/:keyword',
      name: 'word',
      component: Word
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // console.log(to)
    // console.log(from)
    // console.log(savedPosition)
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
