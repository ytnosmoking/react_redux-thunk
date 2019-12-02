
import { login } from '../actions/login'

export const Login = (params) => {
  return async (dispatch) => {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => resolve('ok'), 500)
    })

    const res = await p
    dispatch(login())
    return res
  }
}

