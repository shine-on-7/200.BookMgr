<script setup>
import { appConfig } from '../config/app'
</script>

<template>
  <div class="main-container">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <h1 class="welcome-title">欢迎使用 {{ appConfig.title }}</h1>
      <p class="welcome-subtitle">高效、便捷的图书管理系统</p>
    </div>

    <!-- 系统简介 -->
    <div class="intro-section">
      <el-card class="intro-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon size="24" color="#409EFF"><Document /></el-icon>
            <span>系统简介</span>
          </div>
        </template>
        <p>
          本系统是一套功能完善的图书管理系统，旨在帮助图书馆、学校或个人高效管理图书资源。
          系统采用现代化的技术栈，提供简洁直观的用户界面和稳定可靠的后台服务。
        </p>
      </el-card>
    </div>

    <!-- 功能模块 -->
    <div class="features-section">
      <h2 class="section-title">功能模块</h2>
      
      <div class="features-grid">
        <el-card class="feature-card" shadow="hover">
          <el-icon size="40" color="#409EFF"><Folder /></el-icon>
          <h3>图书管理</h3>
          <p>支持图书的增删改查操作，包括图书信息的录入、编辑、删除和查询功能</p>
          <ul>
            <li>图书列表展示</li>
            <li>添加新图书</li>
            <li>编辑图书信息</li>
            <li>删除图书</li>
          </ul>
        </el-card>

        <el-card class="feature-card" shadow="hover">
          <el-icon size="40" color="#67C23A"><User /></el-icon>
          <h3>用户管理</h3>
          <p>管理系统用户信息，包括用户注册、信息维护、权限分配等功能</p>
          <ul>
            <li>用户列表展示</li>
            <li>添加新用户</li>
            <li>编辑用户信息</li>
            <li>用户权限管理</li>
          </ul>
        </el-card>

        <el-card class="feature-card" shadow="hover">
          <el-icon size="40" color="#E6A23C"><DataAnalysis /></el-icon>
          <h3>统计分析</h3>
          <p>提供图书借阅统计、用户活跃度分析等数据可视化功能</p>
          <ul>
            <li>借阅排行榜</li>
            <li>用户活跃度</li>
            <li>图书流通率</li>
            <li>数据报表导出</li>
          </ul>
        </el-card>

        <el-card class="feature-card" shadow="hover">
          <el-icon size="40" color="#909399"><Setting /></el-icon>
          <h3>系统设置</h3>
          <p>系统参数配置、权限管理、日志查看等高级功能</p>
          <ul>
            <li>参数配置</li>
            <li>权限管理</li>
            <li>操作日志</li>
            <li>数据备份</li>
          </ul>
        </el-card>
      </div>
    </div>

    <!-- 快速入口 -->
    <div class="quick-access">
      <h2 class="section-title">快速入口</h2>
      <div class="quick-buttons">
        <el-button type="primary" size="large" @click="$router.push('/book')">
          <el-icon><List /></el-icon>
          图书列表
        </el-button>
        <el-button type="success" size="large" @click="$router.push('/book/add')">
          <el-icon><Plus /></el-icon>
          添加图书
        </el-button>
        <el-button type="warning" size="large" @click="$router.push('/user')">
          <el-icon><User /></el-icon>
          用户列表
        </el-button>
        <el-button type="info" size="large" @click="$router.push('/user/add')">
          <el-icon><Plus /></el-icon>
          添加用户
        </el-button>
      </div>
    </div>

    <!-- 系统信息 -->
    <div class="system-info">
      <el-descriptions title="系统信息" :column="2" border>
        <el-descriptions-item label="系统名称">{{ appConfig.title }}</el-descriptions-item>
        <el-descriptions-item label="版本号">v1.0.0</el-descriptions-item>
        <el-descriptions-item label="技术支持">Vue 3 + Element Plus</el-descriptions-item>
        <el-descriptions-item label="更新时间">2026-03-15</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 欢迎区域 */
.welcome-section {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  margin-bottom: 30px;
  color: #fff;
}

.welcome-title {
  font-size: 42px;
  margin: 0 0 15px 0;
  font-weight: 600;
}

.welcome-subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin: 0;
}

/* 系统简介 */
.intro-section {
  margin-bottom: 30px;
}

.intro-card {
  border-radius: 10px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 500;
}

.intro-card p {
  line-height: 1.8;
  color: #606266;
  font-size: 15px;
}

/* 功能模块 */
.features-section {
  margin-bottom: 30px;
}

.section-title {
  text-align: center;
  font-size: 28px;
  margin: 0 0 30px 0;
  color: #303133;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.feature-card {
  border-radius: 15px;
  text-align: center;
  padding: 30px 20px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  font-size: 20px;
  margin: 15px 0 10px 0;
  color: #303133;
}

.feature-card p {
  color: #909399;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
}

.feature-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.feature-card ul li {
  padding: 5px 0;
  padding-left: 20px;
  position: relative;
  color: #606266;
  font-size: 13px;
}

.feature-card ul li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #67C23A;
  font-weight: bold;
}

/* 快速入口 */
.quick-access {
  margin-bottom: 30px;
}

.quick-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.quick-buttons .el-button {
  min-width: 150px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 系统信息 */
.system-info {
  margin-bottom: 30px;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 28px;
  }
  
  .welcome-subtitle {
    font-size: 14px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-buttons {
    flex-direction: column;
  }
  
  .quick-buttons .el-button {
    width: 100%;
  }
}
</style>
