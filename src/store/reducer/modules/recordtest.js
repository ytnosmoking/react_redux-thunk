
const info = {
  num: 0
}

// const status = {
//   RECORD_UPLOAD: 'upload'
// }

const store = (state = info, action) => {
  const { type } = action
  console.log(type)

  if (type) {
    if (type === 'increase') {
      return { ...state, num: state.num + 1 }
    } else {
      return { ...state, num: state.num - 1 }
    }
  }
  return state
}

export default store
