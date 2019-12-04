


const info = {
  majors: {
    lists: [],
    page: {}
  }
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
  return state
}

export default select