<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../tools/store'
import { menuItems } from '../config/menu'
import { appConfig } from '../config/app'

const appTitle = appConfig.title
const topTitle = "欢迎使用" + appConfig.title
const brandIcon = appConfig.logo
const footer = appConfig.footer
const showFooter = appConfig.showFooter
const showHelpButton = appConfig.showHelpButton
const onHelpClick = appConfig.onHelpClick

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 默认展开的菜单 - 空数组表示默认全部折叠
const defaultOpeneds = []

// 自动根据当前路由高亮菜单
const currentRouteIndex = computed(() => {
  return route.path
})

// 点击帮助按钮
const handleHelpClick = () => {
  // 如果配置了回调函数，优先使用回调
  if (onHelpClick && typeof onHelpClick === 'function') {
    onHelpClick(router)
  } else {
    // 默认行为：打印日志
    console.log('点击了帮助按钮')
  }
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}

// 点击菜单跳转路由
const handleMenuSelect = (indexPath) => {
  let targetPath = indexPath
}

</script>


<template>
  <div class="common-layout">
    <el-container class="layout">
      <!-- 侧边栏 -->
      <el-aside width="220px" class="aside">
        <div class="brand">
          <el-icon class="brand-icon"><component :is="brandIcon" /></el-icon>
          <span class="brand-name">{{ appTitle }}</span>
        </div>
        
        <el-scrollbar class="menu-scroll">
          <el-menu
            :default-active="currentRouteIndex"
            :default-openeds="defaultOpeneds"
            @select="handleMenuSelect"
            background-color="var(--sidebar-bg)"
            router
          >
            <!-- 循环渲染菜单 -->
            <template v-for="item in menuItems" :key="item.index">
              <!-- 无子菜单 -->
              <el-menu-item 
                v-if="!item.children" 
                :index="item.path || item.index"
              >
                <el-icon><component :is="item.icon" /></el-icon>
                <span>{{ item.label }}</span>
              </el-menu-item>
              
              <!-- 有子菜单 -->
              <el-sub-menu v-else :index="item.index">
                <template #title>
                  <el-icon><component :is="item.icon" /></el-icon>
                  <span>{{ item.label }}</span>
                </template>
                <el-menu-item 
                  v-for="child in item.children" 
                  :key="child.index" 
                  :index="child.path || child.index"
                >
                  <el-icon><component :is="child.icon" /></el-icon>
                  <span>{{ child.label }}</span>
                </el-menu-item>
              </el-sub-menu>
            </template>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <!-- 主体区域 -->
      <el-container>
        <!-- 头部 -->
        <el-header class="header">
          <div class="logo">{{ topTitle }}</div>
          <div class="header-actions">
            <el-button v-if="showHelpButton" type="default" link class="white-link" @click="handleHelpClick">帮助</el-button>
            <el-button type="default" link class="white-link" @click="handleLogout">退出</el-button>
          </div>
        </el-header>

        <el-main class="main">
          <router-view />
        </el-main>

        <el-footer v-if="showFooter" class="footer">{{ footer }}</el-footer>
      </el-container>
    </el-container>
  </div>
</template>



<style scoped>
/* 颜色变量定义 */
.common-layout {
  --sidebar-bg: #589adc;              /* 侧边栏背景色 */
  --sidebar-border: rgba(255,255,255,0.1);  /* 侧边栏右边框颜色 */
  --sidebar-brand-border: rgba(255,255,255,0.2);  /* 侧边栏品牌区域下边框 */
  --text-white: #ffffff;              /* 白色文字颜色 */
  --header-gradient-start: #4a90e2;   /* 头部渐变起始色（左） */
  --header-gradient-end: #9c27b0;     /* 头部渐变结束色（右） */
  --main-bg: #f5f7fa;                 /* 主内容区域背景色 */
  --footer-text: #909399;             /* 底部版权文字颜色 */
  --menu-hover-bg: rgba(255,255,255,0.15);   /* 菜单项悬停背景色 */
  --menu-active-bg: rgba(255,255,255,0.25);  /* 菜单项激活背景色 */
  
  position: absolute;
  inset: 0;
}

.layout { height: 100vh; }
.aside {
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-border);
  display: flex;
  flex-direction: column;
}
.brand {
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-white);
  border-bottom: 1px solid var(--sidebar-brand-border);
}
.brand-icon { font-size: 48px; margin-bottom: 8px; }
.brand-name { font-size: 18px; font-weight: bold; }

/* 菜单样式优化 */
.el-menu-vertical { border-right: none; background: transparent; }
.menu-scroll { flex: 1; overflow-y: auto; }
.aside :deep(.el-menu-item), .aside :deep(.el-sub-menu__title) { color: var(--text-white); }
.aside :deep(.el-menu-item:hover), .aside :deep(.el-sub-menu__title:hover) { background: var(--menu-hover-bg); }
.aside :deep(.el-menu-item.is-active) { background: var(--menu-active-bg); }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: linear-gradient(90deg, var(--header-gradient-start), var(--header-gradient-end));
  color: var(--text-white);
  padding: 0 20px;
}
.white-link { color: var(--text-white) !important; }
.white-link:hover { opacity: 0.8; text-decoration: underline; }

.main { background: var(--main-bg); padding: 20px; }
.footer { text-align: center; color: var(--footer-text); font-size: 14px; }

/* 简单的切换动画 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
