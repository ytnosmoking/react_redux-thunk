
import { listModel } from 'utils/tools'

const info = {
  majors: listModel(),
  requireMents: [],
  supportHead: [],
  departments: listModel(),
  teachers: listModel(),
  terms: listModel(),
}

const status = {
  MAJOR: 'majors',
  TERMS: 'terms',
  DEPARTMENTS: 'departments',
  TEACHERS: 'teachers',
}
const status_arr = {
  REQUIRE_MENTS: 'requireMents',
  SUPPORT_HEAD: 'supportHead',
}

const select = (state = info, action) => {
  const { type } = action
  const name = status[type]
  if (name) {
    return {
      ...state, [name]: {
        lists: [...state[name].lists, ...action.payload.lists],
        page: action.payload.page
      }
    }
  }
  const name_arr = status_arr[type]
  if (name_arr) {
    return {
      ...state, [name_arr]: action.payload
    }
  }


  return state
}

export default select