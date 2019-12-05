
import { getData, postData } from 'utils/ajax'
import { API } from 'utils/api'
import { setItem } from 'utils/tools'
import { login } from '../actions/login'
import { majors, requireMents, supportHead, departments, teachers } from '../actions/select'
import { homeNeed, homeStudent, homeStudentInfo, homeSupport, homeCourse } from '../actions/home'

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

// 专业
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
// 要求 getRequireMents
export const getRequireMents = (params = { page_size: 10, page: 1 }) => {
  return async (dispatch) => {
    // 
    const p = await getData(API.requireMents, params)
    console.log(p)
    const { errcode, data: lists } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    dispatch(requireMents(lists))
  }
}
// 支撑点
export const getSupport = (params) => {
  return async (dispatch) => {
    // 
    const p = await getData(API.SupportHead, params)
    console.log(p)
    const { errcode, data: lists } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    dispatch(supportHead(lists))
  }
}
// 系
export const getDepartment = (params = { page_size: 10, page: 1 }) => {
  return async (dispatch) => {
    // 
    const p = await getData(API.departments, params)
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
    dispatch(departments({
      lists: lists.map(list => ({ value: list.id, label: list.title })),
      page: {
        page_size: per_page * 1,
        page: current_page,
        total
      }
    }))
  }
}
// 课程组长 老师
export const getTeacher = (params = { page_size: 10, page: 1 }) => {
  return async (dispatch) => {
    // 
    const p = await getData(API.Teacher, params)
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
    dispatch(teachers({
      lists: lists.map(list => ({ value: list.id, label: list.name })),
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

export const getHomeSupport = (params) => {
  console.log(params)
  return async (dispatch) => {
    const p = await getData(API.Support, params)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    dispatch(homeSupport({
      lists: lists.map(item => {
        const { enter_year, achivement, major, graduate_explain, graduate_requirement, id } = item;
        return {
          key: id,
          enter_year,
          achivement,
          major,
          support: graduate_requirement.number + '.' + graduate_explain.number,
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

export const getHomeCourse = (params) => {
  console.log(params)
  return async (dispatch) => {
    const p = await getData(API.Course, params)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    dispatch(homeCourse({
      lists: lists.map(item => {
        const { id, title, teacher: leader, department, training_plan_achivements } = item;
        const terms = []
        const courses = []
        const teacher = []
        const average = []
        if (training_plan_achivements && training_plan_achivements.length > 0) {
          training_plan_achivements.forEach(item => {
            const { training_plan, average_achivement } = item
            const { term, teachers, course } = training_plan
            terms.push(term)
            courses.push(course)
            teacher.push(teachers)
            average.push(average_achivement)
          })
        }

        return {
          key: id,
          title,
          leader,
          terms,
          courses,
          teacher,
          department,
          average
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

