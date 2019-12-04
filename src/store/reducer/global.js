
import { getItem, removeItem } from 'utils/tools'
// const setItem = (key, value) => localStorage.setItem(key, value)
// const getItem = key => localStorage.getItem(key)
// const removeItem = key => localStorage.removeItem(key)

const golobalState = {
  isLogin: getItem('isLogin') || '',
  info: {}
}


const globalReducer = (state = golobalState, action) => {
  const { type } = action
  console.log(action)
  if (type === 'login') {
    const { isLogin, info } = action.payload
    return { ...state, isLogin, info }
  }
  if (type === 'logout') {
    removeItem('isLogin')
    return { ...state, info: {}, isLogin: false }
  }
  return state
}


export default globalReducer