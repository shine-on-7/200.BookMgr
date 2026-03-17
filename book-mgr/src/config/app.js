import { ElMessageBox } from 'element-plus'

export const appConfig = {
  title: '图书管理系统',  // 或 '用户管理系统'
  logo: 'Collection',     // 图标名称
  footer: '© 2026 Book Manager System',
  showFooter: false,       // 是否显示页脚
  showHelpButton: true,
  onHelpClick: (router) => {
    ElMessageBox.confirm('确定要帮助吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      router.push('/help')
    }).catch(() => {
      // 取消帮助
    })
  }
}