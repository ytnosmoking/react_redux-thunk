
const setItem = (key, value) => localStorage.setItem(key, value)
const getItem = key => localStorage.getItem(key)
const removeItem = key => localStorage.removeItem(key)

const golobalState = {
  isLogin: getItem('isLogin') || '',
  info: {}
}


const globalReducer = (state = golobalState, action) => {
  const { type } = action
  console.log(action)
  if (type === 'login') {
    setItem('isLogin', true)
    return { ...state, isLogin: true, info: { id: 1, name: '123' } }
  }
  if (type === 'logout') {
    removeItem('isLogin')
    return { ...state, info: {}, isLogin: false }
  }
  return state
}


export default globalReducer