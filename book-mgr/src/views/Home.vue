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
const showHelpButton = appConfig.showHelpButton
const onHelpClick = appConfig.onHelpClick

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

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
  // 如果菜单项配置了 path，直接跳转
  // 这里简单处理：假设 indexPath 就是 path，或者你需要遍历 menuItems 找到对应的 path
  // 更优雅的做法是在 menuItems 里直接存 path，点击时直接 router.push(path)
  
  // 简单演示：查找对应的 path
  let targetPath = indexPath
  
  // 实际逻辑建议：在 menuItems 定义时就把 path 绑死，点击直接跳
  // 由于 el-menu 的 select 返回的是 index，我们需要一个映射关系
  // 这里为了演示简化，假设你的 index 和 path 有某种对应，或者直接在 template 里用 @click 替换 @select
  
  // 【最佳实践修正】：直接在 template 的 el-menu-item 上绑定 @click="router.push(item.path)"
  // 这样就不需要 handleSelect 里的复杂逻辑了。
  // 但为了兼容 el-menu 的样式，我们保留 select 事件，但在数据源里确保 index 就是 path 或者做映射
}

// 修正：更简单的菜单点击处理
// 建议在模板中直接改：@click="router.push(item.path)" 
// 这里保留原逻辑作为备用，但推荐在模板中直接绑定 path
</script>

<!-- 优化后的模板部分：直接绑定 path -->
<!-- 
  注意：上面的 script 中 handleMenuSelect 其实可以简化。
  最推荐的做法是将模板中的 @select 改为在 item 上直接 @click 
  但为了保持 el-menu 的激活状态逻辑，我们保持 @select，
  并在数据源中让 index 等于 path，或者做一个简单的映射函数。
-->


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
            @select="handleMenuSelect"
            unique-opened
            background-color="var(--sidebar-bg)"
            router
          >
            <!-- 循环渲染菜单，不再硬编码每个 item -->
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

        <!-- 核心修改：使用 router-view 替代所有的 v-if -->
        <!-- 具体的页面组件会根据 URL 自动加载到这里 -->
        <el-main class="main">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>

        <el-footer class="footer">{{ footer }}</el-footer>
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
