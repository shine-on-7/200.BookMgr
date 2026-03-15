export const menuItems = [
  { index: '1', label: '首页', icon: 'House', path: '/home' },
  {
    index: '2',
    label: '图书管理',
    icon: 'Folder',
    children: [
      { index: '2-1', label: '图书列表', icon: 'List', path: '/book' },
      { index: '2-2', label: '创建图书', icon: 'Plus', path: '/book/add' },
      // 详情页通常不需要在菜单显示
    ]
  },
  {
    index: '3',
    label: '用户管理',
    icon: 'Calendar',
    children: [
      { index: '3-1', label: '用户列表', icon: 'List', path: '/user' },
      { index: '3-2', label: '创建用户', icon: 'Plus', path: '/user/add' },
    ]
  },
  // ... 其他菜单项结构相同，只需配置 path 即可，无需引入组件
]