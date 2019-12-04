
import { getData, postData } from 'utils/ajax'
import { API } from 'utils/api'
import { setItem } from 'utils/tools'
import { login } from '../actions/login'
import { majors } from '../actions/select'
import { homeNeed, homeStudent, homeStudentInfo } from '../actions/home'

export const Login = (params) => {
  return async (dispatch) => {
    const p = await postData(API.Login, params)
    const { data: { token }, errcode } = p
    if (errcode === 0) {
      setItem('isLogin', token)
    }
    const userInfo = await getData(API.userInfo)
    const { data: info } = userInfo
    dispatch(login({ isLogin: token, info }))
    return p
  }
}

export const getMajors = (params = { page_size: 10, page: 1 }) => {
  return async (dispatch) => {
    // 
    const p = await getData(API.majors, params)
    console.log(p)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    dispatch(majors({
      lists: lists.map(list => ({ value: list.id, label: list.title })),
      page: {
        page_size: per_page * 1,
        page: current_page,
        total
      }
    }))
  }
}


export const getHomeNeed = (params) => {
  console.log(params)
  return async (dispatch) => {
    const p = await getData(API.HomeNeed, params)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    dispatch(homeNeed({
      lists: lists.map(item => ({ ...item, key: item.id })),
      page: {
        page_size: per_page * 1,
        page: current_page,
        total
      }
    }))
  }
}

export const getHomeStudent = (params) => {
  console.log(params)
  return async (dispatch) => {
    const p = await getData(API.Graduate, params)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    dispatch(homeStudent({
      lists: lists.map(item => {
        const { student } = item;
        const { student_no, name, class: classes } = student
        const { enter_year, major } = classes
        return {
          key: item.id,
          enter_year,
          student_no,
          name,
          major,
          class: classes,
          ...item
        }
      }),
      page: {
        page_size: per_page * 1,
        page: current_page,
        total
      }
    }))
  }
}

export const getHomeStudentInfo = (params) => {
  console.log(params)
  return async (dispatch) => {
    const p = await getData(API.GraduateInfo, params)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    dispatch(homeStudentInfo({
      lists: lists.map(item => {
        const { course, id } = item;
        const { course_no, course_type, title, credit } = course

        return {
          key: id,
          course_no,
          course_type,
          title,
          credit,
        }
      }),
      page: {
        page_size: per_page * 1,
        page: current_page,
        total
      }
    }))
  }
}
