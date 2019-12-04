

const homeInfo = {
  need: {
    lists: [],
    page: {
      page_size: 10,
      page: 1,
      total: 1
    }
  },
  student: {
    lists: [],
    page: {
      page_size: 10,
      page: 1,
      total: 1
    }
  },
  studentInfo: {
    lists: [],
    page: {
      page_size: 10,
      page: 1,
      total: 1
    }
  }

}



const HomeStore = (state = homeInfo, action) => {
  const { type } = action
  if (type === 'getHomeNeed') {
    return { ...state, need: { ...action.payload } }
  }
  if (type === 'getHomeStudent') {
    return {
      ...state, student: { ...action.payload }
    }
  }
  if (type === 'getHomeStudentInfo') {
    return {
      ...state, studentInfo: { ...action.payload }
    }
  }
  return state
}

export default HomeStore