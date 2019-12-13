import { listModel } from 'utils/tools'

const courseIno = {
  courses: listModel(),
  teacher: listModel(),
  student: listModel(),
}


const status = {
  manageCourses: 'courses',
  manageTeacher: 'teacher',
  manageStudent: 'student',

}
const manageStore = (state = courseIno, action) => {
  const { type } = action

  if (status[type]) {
    return { ...state, [status[type]]: { ...action.payload } }
  }
  return state
}

export default manageStore