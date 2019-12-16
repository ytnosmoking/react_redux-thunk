import { listModel } from 'utils/tools'

const courseIno = {
  courses: listModel(),
  teacher: listModel(),
  student: listModel(),
}


const status = {
  MANAGE_COURSES: 'courses',
  MANAGE_TEACHER: 'teacher',
  MANAGE_STUDENT: 'student',

}
const manageStore = (state = courseIno, action) => {
  const { type } = action

  if (status[type]) {
    return { ...state, [status[type]]: { ...action.payload } }
  }
  return state
}

export default manageStore