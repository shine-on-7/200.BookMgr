<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleAddClick = () => {
  router.push('/book/add')
}

const handleEditClick = (id) => {
  router.push(`/book/edit/${id}`)
}

</script>


<template>
  <div>
    <h1>BookList</h1>
    <el-button type="primary" @click="handleAddClick">创建图书</el-button>
    <el-button type="primary" @click="handleEditClick(2)">编辑图书</el-button>
  </div>
</template>



<style scoped>

</style>
