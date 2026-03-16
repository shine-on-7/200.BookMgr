<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
  <div>
    <h1>UserList</h1>
    <el-button type="primary" size="small" @click="$router.push('/user/add')">添加用户</el-button>
    <el-button type="primary" size="small" @click="$router.push('/user/edit/1001')">编辑用户</el-button>
  </div>
</template>
