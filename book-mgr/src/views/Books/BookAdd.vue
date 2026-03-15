<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSubmit = () => {
  // router.push('/book')
  router.back()
}
</script>


<template>
  <div>
    <h1>BookAdd</h1>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>
