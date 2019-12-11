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

