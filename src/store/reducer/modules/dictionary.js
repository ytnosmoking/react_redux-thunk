
import { listModel } from 'utils/tools'

const courseIno = {
  college: listModel(),
  department: listModel(),
  major: listModel(),
  classes: listModel(),
  terms: listModel(),
  courseType: listModel()
}

const status = {
  DIC_COLLEGE: 'college',
  DIC_DEPARTMENT: 'department',
  DIC_MAJOR: 'major',
  DIC_CLASSES: 'classes',
  DIC_TERMS: 'terms',
  DIC_COURSETYPE: 'courseType'

}
const dictionary = (state = courseIno, action) => {
  const { type } = action
  if (status[type]) {
    return { ...state, [status[type]]: { ...action.payload }}
  }
  return state
}

export default dictionary
