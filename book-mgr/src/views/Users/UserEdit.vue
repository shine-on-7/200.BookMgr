<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const formRef = ref(null)
const form = ref({
    id: route.params.id,
    username: '张三',
    password: '123123',
    sex: '男',
    age: 18,
    email: 'zhangsan@example.com',
    phone: '13800001111',
    role: 'admin'
})

const rules = ref({
    username: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }],
    password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] },
    { min: 6, max: 12, message: '密码长度必须在6到12之间', trigger: ['blur', 'change'] }
    ],
    sex: [{ required: true, message: '请选择性别', trigger: ['change'] }],
    age: [{ required: true, message: '请输入年龄', trigger: ['blur', 'change'] },
    { 
      type: 'number', 
      min: 18, 
      max: 120, 
      message: '年龄必须在 18 到 120 之间', 
      trigger: ['blur', 'change'] 
    }
    ],
    email: [{ required: true, message: '请输入邮箱', trigger: ['blur', 'change'] },
    { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
    ],
    phone: [{ required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
    ],

})

const handleSubmit = async () => {
    try {
        await formRef.value?.validate()
        // 打印数据
        console.log(form.value)
        console.log(JSON.stringify(form.value))
        ElMessage.success('提交成功')

    } catch (error) {
        ElMessage.error('请填写完整信息！')
        return
    }

}

</script>

<template>
    <div class="user-edit">
        <h1>UserEdit</h1>
        <div class="form-container">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" size="large" class="center-form">
                <h2>编辑用户</h2>
                <el-form-item label="用户ID" prop="id">
                    <el-input v-model="form.id" placeholder="请输入用户ID"></el-input>
                </el-form-item>

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio value="男">男</el-radio>
                        <el-radio value="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="年龄" prop="age">
                    <el-input 
                      v-model.number="form.age" 
                      type="number"
                      min="18"
                      max="120"
                      placeholder="请输入年龄"
                    ></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>

                <el-form-item label="角色" prop="role">
                    <el-radio-group v-model="form.role">
                        <el-radio value="admin">管理员</el-radio>
                        <el-radio value="user">普通用户</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                    <el-button type="warning" @click="router.back()">取消</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>


<style lang="css" scoped>
.form-container {
    padding: 20px;
    /* height: 100vh; */
    display: flex;
    justify-content: center;
    /* align-items: center; */

    .el-form {
        background-color: #fff;
        padding: 20px;
        width: 400px;
        border-radius: 10px;

        .h2 {
            margin-top: 20px;
            margin-bottom: 30px;
        }

        .el-form-item__label {
            margin-top: 25px;
        }

        .el-button {
            margin-top: 30px;
            width: 45%;
        }
    }
}
</style>