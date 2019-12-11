


const info = {
  routes: []
}

const history = (state = info, action) => {
  const { type } = action
  if (type === 'add') {
    return { ...state, routes: [...state.routes] }
  }
  return state
}

export default history