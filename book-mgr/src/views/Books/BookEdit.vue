<script setup>
import { reactive, ref } from 'vue' 
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const form = reactive({
  id: route.params.id  
})

const rules = reactive({
  id: [{ required: true, message: '请输入图书编号', trigger: 'blur' }]
})

const formRef = ref(null)

const handleSubmit = () => {
  router.push('/book')
}

const handleCancelClick = () => {
  router.push('/book')
}
</script>


<template>
  <div>
    <h1>BookEdit</h1>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="图书编号" prop="id">
        <el-input v-model="form.id" placeholder="请输入图书编号" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
    <el-button type="primary" @click="handleCancelClick">取消</el-button>
  </div>
</template>
