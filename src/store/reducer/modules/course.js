import { listModel } from 'utils/tools'

const courseIno = {
  manage: listModel(),
  manageScore: listModel(),
  target: listModel()
}


const status = {
  courseManage: 'manage',
  courseManageScore: 'manageScore',
  courseTarget: 'target',
}
const courseStore = (state = courseIno, action) => {
  const { type } = action

  if (status[type]) {
    return { ...state, [status[type]]: { ...action.payload } }
  }
  return state
}

export default courseStore