import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref({})

  const initFromStorage = () => {
    const stored = localStorage.getItem('userInfo')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        userInfo.value = data
        token.value = data.token || 'mock-token-' + data.id
      } catch (e) {
        localStorage.removeItem('userInfo')
      }
    }
  }

  const login = (user) => {
    userInfo.value = user
    token.value = user.token || 'mock-token-' + user.id
    localStorage.setItem('userInfo', JSON.stringify(user))
  }

  const logout = () => {
    token.value = ''
    userInfo.value = {}
    localStorage.removeItem('userInfo')
  }

  initFromStorage()

  return { token, userInfo, login, logout, initFromStorage }
})
