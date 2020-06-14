export const setItem = (key, value) => localStorage.setItem(key, value)
export const getItem = key => localStorage.getItem(key)
export const removeItem = key => localStorage.removeItem(key)

export const listModel = () => ({
  lists: [],
  page: {
    page_size: 10,
    page: 0,
    total: 1
  }
})

export const createAction = (type) => (payload) => ({ type, payload })
export const actionObj = (type = '', payload = {}) => ({ type, payload })
const roles = {
  'teacher': '老师',
  'major_master': '主任',
  'professor': '教授',
  'group_master': '组长',
  'department_master': '院长',
  'admin': '管理员'
}
export const filterRole = role => {
  return roles[role] || ''
}

// 混入方法1
// 深拷贝
function copyProperties(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      const desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

export function mix(...mixins) {
  class Mix {
    // 如果不需要拷贝实例属性下面这段代码可以去掉
    constructor() {
      for (const mixin of mixins) {
        // eslint-disable-next-line new-cap
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (const mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

