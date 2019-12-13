


import { listModel } from 'utils/tools'

const courseIno = {
  college: listModel(),
  department: listModel(),
  major: listModel(),
  classes: listModel(),
  terms: listModel(),
  courseType: listModel(),
}


const status = {
  dicCollege: 'college',
  dicDepartment: 'department',
  dicMajor: 'major',
  dicClasses: 'classes',
  dicTerms: 'terms',
  dicCourseType: 'courseType',

}
const dictionary = (state = courseIno, action) => {
  const { type } = action
  if (status[type]) {
    return { ...state, [status[type]]: { ...action.payload } }
  }
  return state
}

export default dictionary