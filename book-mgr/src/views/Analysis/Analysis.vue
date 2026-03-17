<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue'
import { Pie, Bar } from 'vue-chartjs'
import request from '../../tools/request'
import { useRoute } from 'vue-router'
import { 
  Chart as ChartJS, 
  ArcElement, Tooltip, Legend, 
  CategoryScale, LinearScale, BarElement, Title 
} from 'chart.js'


// 注册 Chart.js 组件
ChartJS.register(
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title
)

const barChartRef = ref(null);

// 图表数据（模拟数据，实际从后端获取）
const chartData = ref({
  labels: ['规划中', '进行中', '已完成'],
  datasets: [
    {
      label: '任务数量',
      data: [12, 19, 30], // 初始模拟数据
      backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0'],
      borderWidth: 1,
      borderRadius: 5 // 柱状图圆角
    }
  ]
})


// 饼状图数据
const riskData = {
  labels: ['离职风险', '需求变更', '资金风险', '其他'],
  datasets: [
    {
      data: [1, 3, 2, 4],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
    }
  ]
}

// 饼图配置
const pieOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw || 0
          const total = context.dataset.data.reduce((a, b) => a + b, 0)
          const percentage = Math.round((value / total) * 100)
          return `${context.label}: ${value} 个 (${percentage}%)`
        }
      }
    }
  }
})


// 柱状图数据
const userData = ref(
    {
    labels: ['项目经理', '开发', '测试', '运维', '干系人'],
    datasets: [
        {
            label: '人员数量',
            data: [12, 29, 6, 4, 2],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
            borderWidth: 1,
            borderRadius: 5 // 柱状图圆角
        }
    ]
}
)


// 柱状图配置
const barOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'top' } },
  scales: {
    y: { beginAtZero: true, ticks: { precision: 0 } }
  }
})

// 计算属性：统计数据
const totalProjects = computed(() => {
  return chartData.value.datasets[0].data.reduce((a, b) => a + b, 0)
})
const pendingProjects = computed(() => chartData.value.datasets[0].data[0])
const inProgressProjects = computed(() => chartData.value.datasets[0].data[1])
const completedProjects = computed(() => chartData.value.datasets[0].data[2])

// 更新时间
const updateTime = ref(new Date().toLocaleString())

// 从后端获取数据
const fetchTaskData = async () => {
  try {
    const data = await request.get('/project-statistics/');

    chartData.value.datasets[0].data = [
            data.planning_projects,
            data.doing_projects,
            data.done_projects
        ];
    
    riskData.datasets[0].data = [
            data.risk_leave,
            data.risk_change,
            data.risk_money,
            data.risk_other
        ];

    userData.value.datasets[0].data = [
            data.pm_users,
            data.dev_users,
            data.qa_users,
            data.ops_users,
            data.stakeholder_users
        ];

     if (barChartRef.value) {
      // 获取底层 Chart.js 实例
      const chartInstance = barChartRef.value.chart;
      if (chartInstance) {
        chartInstance.data = userData.value;
        chartInstance.update(); // 手动调用 Chart.js 的 update 方法
      }
    }

    updateTime.value = new Date().toLocaleString();
  } catch (error) {
    console.error('获取项目数据失败');
  }
}

const route = useRoute() // 获取当前路由实例

// 监听路由变化：每次路由切换到当前页面时重新获取数据
watch(
  () => route.path, // 监听路由路径
  (newPath) => {
    if (newPath === '/dashboard') {
      fetchTaskData()
    }
  },
  { immediate: true }
)

// 组件挂载时获取数据
onMounted(() => {
//   fetchTaskData()
})
</script>


<template>
  <div class="stats-container">
    <!-- 1. 顶部主标题 -->
    <div class="header">
      <h1 class="main-title">📊 项目数据可视化展示</h1>
      <p class="subtitle">实时监控项目进展，助力高效管理</p>
    </div>

    <!-- 2. 统计概览卡片 -->
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon total">📋</div>
        <div class="stat-content">
          <div class="stat-value">{{ totalProjects }}</div>
          <div class="stat-label">总项目数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon completed">✅</div>
        <div class="stat-content">
          <div class="stat-value">{{ completedProjects }}</div>
          <div class="stat-label">已完成</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon in-progress">⏳</div>
        <div class="stat-content">
          <div class="stat-value">{{ inProgressProjects }}</div>
          <div class="stat-label">进行中</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon pending">⏰</div>
        <div class="stat-content">
          <div class="stat-value">{{ pendingProjects }}</div>
          <div class="stat-label">规划中</div>
        </div>
      </div>
    </div>

    <!-- 3. 图表区域（左右并排） -->
    <div class="charts-container">
      <!-- 饼图卡片 -->
      <div class="chart-card">
        <h3 class="chart-title">📈 风险因素占比（饼状图） </h3>
        <div class="chart-wrapper">
          <Pie :data="riskData" :options="pieOptions" />
        </div>
      </div>

      <!-- 柱状图卡片 -->
      <div class="chart-card">
        <h3 class="chart-title">📊 人员结构图（柱状图）</h3>
        <div class="chart-wrapper">
          <Bar ref="barChartRef" :data="userData" :options="barOptions" />
        </div>
      </div>
    </div>

    <!-- 4. 数据更新时间 -->
    <div class="update-info">
      <span>📅 数据更新时间：{{ updateTime }}</span>
    </div>
  </div>
</template>



<style scoped>
/* 全局容器 */
.stats-container {
  position: relative;
  width: calc(100% + 40px);
  height: 100%;
  min-height: calc(100vh - 140px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: -20px;
  padding: 20px;
  box-sizing: border-box;
}

/* 顶部标题 */
.header {
  text-align: center;
  margin-bottom: 30px;
  color: white;
}

.main-title {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-top: 30px;
  margin-bottom: 50px;
}

/* 统计卡片 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 2.5rem;
  padding: 10px;
  border-radius: 50%;
  background: #f0f0f0;
}

.stat-icon.total { background: #e3f2fd; }
.stat-icon.completed { background: #e8f5e8; }
.stat-icon.in-progress { background: #fff3e0; }
.stat-icon.pending { background: #f3e5f5; }

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
}

/* 图表容器（左右并排，自动换行） */
.charts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

/* 单个图表卡片 */
.chart-card {
  flex: 1 1 calc(50% - 20px);
  min-width: 300px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.chart-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 1.3rem;
}

/* 图表包装器（固定高度） */
.chart-wrapper {
  height: 350px; /* 图表高度 */
}

/* 更新时间 */
.update-info {
  text-align: center;
  color: white;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 70px;
}

/* 响应式设计：小屏幕上下堆叠 */
@media (max-width: 768px) {
  .charts-container {
    flex-direction: column; /* 改为垂直排列 */
  }

  .main-title {
    font-size: 2rem;
  }

  .stats-cards {
    grid-template-columns: repeat(2, 1fr); /* 2列布局 */
  }
}

@media (max-width: 480px) {
  .stats-cards {
    grid-template-columns: 1fr; /* 1列布局 */
  }

  .chart-wrapper {
    height: 300px; /* 减小图表高度 */
  }
}
</style>
