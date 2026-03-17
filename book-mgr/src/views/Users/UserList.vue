<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
  <div class="user-list-container">
    <h1>UserList</h1>
    <el-button type="primary" size="small" @click="$router.push('/user/add')">添加用户</el-button>
    <el-button type="primary" size="small" @click="$router.push('/user/edit/1001')">编辑用户</el-button>
  </div>
</template>


<style scoped>
  .user-list-container {
    min-height: calc(100% + 40px);
    background-color: #93a7c7 !important;
    padding: 20px;
    margin: -20px;
    box-sizing: border-box;
  }
  
  h1 {
    color: rgb(149, 5, 174);
  }
</style>
