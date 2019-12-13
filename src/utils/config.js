export const isDev = process.env.NODE_ENV === 'development'

// const devUrl = 'http://dcd.test/api' // 本地
const devUrl = 'http://dcd.hooook.com/api' // 测试
// const proUrl = ''
const proUrl = 'http://dcd.hooook.com/api'

export const baseUrl = isDev ? devUrl : proUrl || devUrl