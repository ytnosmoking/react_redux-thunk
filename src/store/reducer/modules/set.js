import { listModel } from 'utils/tools'



const setIno = {
  need: [],
  line: listModel(),
  project: listModel(),
  projectInfo: listModel(),
  support: listModel(),
  supportInfo: listModel(),
  outLine: listModel(),
  outLineInfo: [],
  table: listModel(),
  share: listModel(),
  manage: listModel(),
}

const status = {
  // setNeed: 'need',
  SET_LINE: 'line',
  SET_PROJECT: 'project',
  SET_PROJECT_INFO: 'projectInfo',
  SET_SUPPORT: 'support',
  SET_SUPPORT_INFO: 'supportInfo',
  SET_OUTLINE: 'outLine',
  SET_OUTLINE_INFO: 'outLineInfo',
  SET_TABLE: 'table',
  SET_SHARE: 'share',
  SET_MANAGE: 'manage',
}
const ArrName = ['need', 'outLineInfo']

const setStore = (state = setIno, action) => {
  const { type } = action
  const name = status[type]
  if (name) {
    const isArr = ArrName.includes(name)
    return { ...state, [name]: isArr ? [...action.payload] : { ...action.payload } }
  }
  return state
}

export default setStore