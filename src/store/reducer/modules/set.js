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
  setNeed: 'need',
  setLine: 'line',
  setProject: 'project',
  setProjectInfo: 'projectInfo',
  setSupport: 'support',
  setSupportInfo: 'supportInfo',
  setOutLine: 'outLine',
  setOutLineInfo: 'outLineInfo',
  setTable: 'table',
  setShare: 'share',
  setManage: 'manage',
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