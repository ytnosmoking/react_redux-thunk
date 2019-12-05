


const info = {
  majors: {
    lists: [],
    page: {}
  },
  requireMents: [],
  supportHead: [],
  departments: {
    lists: [],
    page: {}
  },
  teachers: {
    lists: [],
    page: {}
  },
}

const select = (state = info, action) => {
  const { type } = action
  console.log(action)
  if (type === 'major') {
    return {
      ...state, majors: {
        lists: [...state.majors.lists, ...action.payload.lists],
        page: action.payload.page
      }
    }
  }
  if (type === 'departments') {
    return {
      ...state, departments: {
        lists: [...state.departments.lists, ...action.payload.lists],
        page: action.payload.page
      }
    }
  }
  if (type === 'teachers') {
    return {
      ...state, teachers: {
        lists: [...state.teachers.lists, ...action.payload.lists],
        page: action.payload.page
      }
    }
  }
  if (type === 'requireMents') {
    return {
      ...state, requireMents: action.payload
    }
  }
  if (type === 'supportHead') {
    return {
      ...state, supportHead: action.payload
    }
  }
  return state
}

export default select