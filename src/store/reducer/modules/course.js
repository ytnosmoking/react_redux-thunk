import { listModel } from 'utils/tools'

const courseIno = {
  manage: listModel(),
  manageScore: listModel(),
  target: listModel()
}


const status = {
  COURSE_MANAGE: 'manage',
  COURSE_MANAGE_SCORE: 'manageScore',
  COURSE_TARGET: 'target',
}
const courseStore = (state = courseIno, action) => {
  const { type } = action

  if (status[type]) {
    return { ...state, [status[type]]: { ...action.payload } }
  }
  return state
}

export default courseStore