import { listModel } from 'utils/tools'

const homeInfo = {
  need: listModel(),
  student: listModel(),
  studentInfo: listModel(),
  support: listModel(),
  course: listModel()
}

const status = {
  getHomeNeed: 'need',
  getHomeStudent: 'student',
  getHomeStudentInfo: 'studentInfo',
  getHomeSupport: 'support',
  getHomeCourse: 'course',
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