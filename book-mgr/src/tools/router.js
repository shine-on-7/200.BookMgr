import { createRouter, createWebHistory } from 'vue-router'

// 先创建空路由规则（后续补充页面）
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    // 路由守卫（后续加，先占位）
    meta: { requiresAuth: true }
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import('../views/Books/BookList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/book/add',
    name: 'BookAdd',
    component: () => import('../views/Books/BookAdd.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/book/edit/:id',
    name: 'BookEdit',
    component: () => import('../views/Books/BookEdit.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/user',
    name: 'User',
    component: () => import('../views/Users/UserList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/add',
    name: 'UserAdd',
    component: () => import('../views/Users/UserAdd.vue'),
    meta: { requiresAuth: true }  
  }
]

const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router
