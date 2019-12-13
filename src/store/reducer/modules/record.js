import { listModel } from 'utils/tools'

const homeInfo = {
 upload:listModel()
}

const status = {
  recordUpload: 'upload',
}


const HomeStore = (state = homeInfo, action) => {
  const { type } = action
  const name = status[type]
  if (name) {
    return { ...state, [name]: { ...action.payload } }
  }
  return state
}

export default HomeStore