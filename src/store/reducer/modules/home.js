import { listModel } from 'utils/tools'

const homeInfo = {
  need: listModel(),
  student: listModel(),
  studentInfo: listModel(),
  support: listModel(),
  course: listModel()
}

const status = {
  HOME_NEED: 'need',
  HOME_STUDENT: 'student',
  HOME_STUDENT_INFO: 'studentInfo',
  HOME_SUPPORT: 'support',
  HOME_COURSE: 'course',
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