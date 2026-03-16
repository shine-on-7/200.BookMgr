import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../tools/store'

const routes = [
  // 登录页：独立根路由
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { guest: true }
  },
  // 主页：作为父路由，嵌套所有子页面
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'HomeLayout', redirect: '/home' },
      { path: 'home', name: 'Home', component: () => import('../views/Main.vue') },
      { path: 'book', name: 'Book', component: () => import('../views/Books/BookList.vue') },
      { path: 'book/add', name: 'BookAdd', component: () => import('../views/Books/BookAdd.vue') },
      { path: 'book/edit/:id', name: 'BookEdit', component: () => import('../views/Books/BookEdit.vue') },
      { path: 'user', name: 'User', component: () => import('../views/Users/UserList.vue') },
      { path: 'user/add', name: 'UserAdd', component: () => import('../views/Users/UserAdd.vue') },
      { path: 'user/edit/:id', name: 'UserEdit', component: () => import('../views/Users/UserEdit.vue') },
    ]
  },
  // 兜底重定向：未匹配的路径跳登录
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：检查登录状态并重定向
router.beforeEach((to, from, next) => {
  const userStore = useUserStore() // 直接调用，无需 require
  const isAuthenticated = !!userStore.token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // 未登录跳登录
  } else if (to.meta.guest && isAuthenticated) {
    next('/home') // 已登录跳首页
  } else {
    next()
  }
})

export default router