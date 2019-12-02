
import { combineReducers } from 'redux'

import baseInfo from './global'
import history from './history'

const reducer = combineReducers({ all: baseInfo, history })
export default reducer