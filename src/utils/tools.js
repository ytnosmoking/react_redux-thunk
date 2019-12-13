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

export const filterRole = role => {
  if (role === 'teacher') {
    return '老师'
  } else if (role === 'major_master') {
    return '主任'
  } else if (role === 'professor') {
    return '教授'
  } else if (role === 'group_master') {
    return '组长'
  } else if (role === 'department_master') {
    return '院长'
  } else if (role === 'admin') {
    return '管理员'
  } else {
    return ''
  }
}


// 混入方法1
// 深拷贝
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

export function mix(...mixins) {
  class Mix {
    // 如果不需要拷贝实例属性下面这段代码可以去掉
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

