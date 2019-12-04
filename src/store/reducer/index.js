
import { combineReducers } from 'redux'

import baseInfo from './global'
import history from './history'
import select from './select'
import home from './home'

const reducer = combineReducers({
  all: baseInfo,
  history,
  select,
  home
})
export default reducer