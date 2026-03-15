<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../tools/store'
import { User, Lock, SwitchButton } from '@element-plus/icons-vue'
import { appConfig } from '../config/app'

const router = useRouter()
const userStore = useUserStore()

// 表单数据
const formData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

// 登录/注册切换
const isLogin = ref(true)

// 表单引用
const formRef = ref(null)

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 登录逻辑
const handleLogin = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      // 模拟登录
      userStore.login({
        id: 1,
        token: 'user-token-' + Date.now(),
        name: formData.value.username
      })
      console.log('登录成功', userStore.token)
      router.push('/home')
    }
  })
}

// 注册逻辑
const handleRegister = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      // 模拟注册
      console.log('注册成功', { username: formData.value.username, password: formData.value.password })
      
      // 注册成功后自动登录
      userStore.login({
        id: 1,
        token: 'user-token-' + Date.now(),
        name: formData.value.username
      })
      router.push('/home')
    }
  })
}

// 统一提交处理
const handleSubmit = () => {
  console.log('按钮被点击，isLogin =', isLogin.value)
  if (isLogin.value) {
    handleLogin()
  } else {
    handleRegister()
  }
}

// 切换登录/注册
const toggleMode = () => {
  isLogin.value = !isLogin.value
  // 清空表单
  formData.value = {
    username: '',
    password: '',
    confirmPassword: ''
  }
}
</script>


<template>
  <div class="login-container">
    <!-- 背景图片层 -->
    <div class="login-background"></div>
    
    <!-- 系统标题（最上面） -->
    <div class="system-title">
      <h1 class="system-name">{{ appConfig.title }}</h1>
    </div>
    
    <!-- 登录框 -->
    <div class="login-box">
      <!-- 标题区域 -->
      <div class="login-header">
        <div class="logo-wrapper">
          <el-icon :size="50" color="#409EFF"><Lock /></el-icon>
        </div>
        <h1 class="login-title">{{ isLogin ? '欢迎登录' : '欢迎注册' }}</h1>
        <p class="login-subtitle">{{ isLogin ? appConfig.title : '创建新账户' }}</p>
      </div>
      
      <!-- 表单区域 -->
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="0"
        class="login-form"
      >
        <!-- 用户名输入 -->
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            size="large"
            prefix-icon="User"
            clearable
          />
        </el-form-item>
        
        <!-- 密码输入 -->
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <!-- 确认密码（仅注册时显示） -->
        <el-form-item v-if="!isLogin" prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            type="password"
            placeholder="请确认密码"
            size="large"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <!-- 登录/注册按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="submit-btn"
            @click="handleSubmit"
          >
            {{ isLogin ? '登 录' : '注 册' }}
          </el-button>
        </el-form-item>
        
        <!-- 切换登录/注册 -->
        <el-form-item>
          <div class="toggle-container">
            <span class="toggle-text">
              {{ isLogin ? '还没有账户？' : '已有账户？' }}
            </span>
            <el-button
              type="primary"
              link
              class="toggle-btn"
              @click="toggleMode"
            >
              {{ isLogin ? '立即注册' : '立即登录' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<style scoped>
/* 整体容器 */
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* 背景图片层 */
.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 使用渐变背景作为备用 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* 使用实际图片 */
  background-image: url('/src/assets/login-bg.jpg');
  background-size: cover;
  background-position: center;
  z-index: 1;
}

/* 登录框 */
.login-box {
  position: relative;
  z-index: 2;
  width: 420px;
  padding: 30px;
  margin-top: 130px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 系统标题（最上面，水平居中） */
.system-title {
  position: fixed;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  text-align: center;
  width: 100%;
  animation: fadeInDown 0.6s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.system-name {
  font-size: 64px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
}

/* 标题区域 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.login-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
}

.login-subtitle {
  font-size: 14px;
  color: #999;
  margin: 0;
}

/* 表单样式 */
.login-form {
  margin-top: 20px;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 20px;
}

.login-form :deep(.el-input__wrapper) {
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.login-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
}

.login-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

/* 提交按钮 */
.submit-btn {
  width: 100%;
  height: 46px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

/* 切换区域 */
.toggle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.toggle-text {
  font-size: 14px;
  color: #666;
}

.toggle-btn {
  font-size: 14px;
  font-weight: 500;
  padding: 0;
}

.toggle-btn:hover {
  color: #667eea;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .login-box {
    width: 90%;
    max-width: 420px;
    padding: 30px 20px;
  }
  
  .login-title {
    font-size: 24px;
  }
  
  .logo-wrapper {
    width: 60px;
    height: 60px;
  }
  
  .logo-wrapper .el-icon {
    font-size: 30px;
  }
}
</style>