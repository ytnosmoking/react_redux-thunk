
import { message } from 'antd'
import { getData, postData } from 'utils/ajax'
import { API } from 'utils/api'
import { setItem, createAction } from 'utils/tools'
import * as ACTION from './action_type'
// 所有设置的action 都可以不要了 利用createAction 动态生成action

export const Login = (params) => {
  return async (dispatch) => {
    const p = await postData(API.LOGIN, params)
    const { data: { token }, errcode } = p
    if (errcode === 0) {
      setItem('isLogin', token)
    }
    const userInfo = await getData(API.USER_INFO)
    const { data: info } = userInfo
    const payload = { isLogin: token, info }
    dispatch(createAction(ACTION.LOGIN)(payload))
    return p
  }
}

// 专业
export const getMajors = (params = { page_size: 10, page: 1 }) => {
  return async (dispatch) => {
    const p = await getData(API.MAJOR, params)
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
    const payload = {
      lists: lists.map(list => ({ value: list.id, label: list.title })),
      page: {
        page_size: per_page * 1,
        page: current_page,
        total
      }
    }
    dispatch(createAction(ACTION.MAJOR)(payload))
  }
}
// 学期
export const getTerms = (params = { page_size: 10, page: 1 }) => {
  return async (dispatch) => {
    const p = await getData(API.TERMS, params)
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
    const payload = {
      lists: lists.map(list => ({ value: list.id, label: list.title })),
      page: {
        page_size: per_page * 1,
        page: current_page,
        total
      }
    }
    dispatch(createAction(ACTION.TERMS)(payload))
  }
}

// 要求 getRequireMents
export const getRequireMents = (params = { page_size: 10, page: 1 }) => {
  return async (dispatch) => {
    // 
    const p = await getData(API.REQUIRE_MENTS, params)
    console.log(p)
    const { errcode, data: lists } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    dispatch(createAction(ACTION.REQUIRE_MENTS)(lists))
  }
}
// 支撑点
export const getSupport = (params) => {
  return async (dispatch) => {
    // 
    const p = await getData(API.SUPPORT_HEAD, params)
    console.log(p)
    const { errcode, data: lists } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    dispatch(createAction(ACTION.SUPPORT_HEAD)(lists))
  }
}
// 系
export const getDepartment = (params = { page_size: 10, page: 1 }) => {
  return async (dispatch) => {
    const p = await getData(API.DEPARTMENTS, params)
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
    const payload = {
      lists: lists.map(list => ({ value: list.id, label: list.title })),
      page: {
        page_size: per_page * 1,
        page: current_page,
        total
      }
    }
    dispatch(createAction(ACTION.DEPARTMENTS)(payload))
  }
}
// 课程组长 老师
export const getTeacher = (params = { page_size: 10, page: 1 }) => {
  return async (dispatch) => {
    const p = await getData(API.TEACHERS, params)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    const payload = {
      lists: lists.map(list => ({ value: list.id, label: list.name })),
      page: {
        page_size: per_page * 1,
        page: current_page,
        total
      }
    }
    dispatch(createAction(ACTION.TEACHERS)(payload))
  }
}


// Home
export const getHomeNeed = (params) => {
  console.log(params)
  return async (dispatch) => {
    const p = await getData(API.HOME_NEED, params)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    const payload = {
      lists: lists.map(item => ({ ...item, key: item.id })),
      page: {
        page_size: per_page * 1,
        page: current_page,
        total
      }
    }
    dispatch(createAction(ACTION.HOME_NEED)(payload))
  }
}

export const getHomeStudent = (params) => {
  console.log(params)
  return async (dispatch) => {
    const p = await getData(API.HOME_STUDENT, params)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    const payload = {
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
    }
    dispatch(createAction(ACTION.HOME_STUDENT)(payload))
  }
}

export const getHomeStudentInfo = (params) => {
  console.log(params)
  return async (dispatch) => {
    const p = await getData(API.HOME_STUDENT_INFO, params)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    const payload = {
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
    }
    dispatch(createAction(ACTION.HOME_STUDENT_INFO)(payload))
  }
}

export const getHomeSupport = (params) => {
  console.log(params)
  return async (dispatch) => {
    const p = await getData(API.HOME_SUPPORT, params)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    const payload = {
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
    }
    dispatch(createAction(ACTION.HOME_SUPPORT)(payload))
  }
}

export const getHomeCourse = (params) => {
  console.log(params)
  return async (dispatch) => {
    const p = await getData(API.HOME_COURSE, params)
    const { errcode, data: {
      current_page,
      per_page,
      total,
      data: lists
    } } = p
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    const payload = {
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
    }
    dispatch(createAction(ACTION.HOME_COURSE)(payload))
  }
}


// Course
export const getCourseManage = params => {
  console.log(params)
  return async (dispatch) => {
    try {
      const p = await getData(API.COURSE_MANAGE, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data
      } } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists: data.map(list => ({ key: list.id, ...list })),
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }
      dispatch(createAction(ACTION.COURSE_MANAGE)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}

export const getCourseManageScore = params => {
  return async (dispatch) => {
    try {
      const p = await getData(API.COURSE_MANAGE_SCORE, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data
      } } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists: data.map(list => ({ key: list.id, ...list })),
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }
      dispatch(createAction(ACTION.COURSE_MANAGE_SCORE)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}

export const getCourseTarget = params => {
  return async (dispatch) => {
    try {
      const p = await getData(API.COURSE_TARGET, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data
      } } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists: data.map(list => ({ key: list.id, ...list })),
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }
      dispatch(createAction(ACTION.COURSE_TARGET)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}

// Set
export const getSetLine = params => {
  return async (dispatch) => {
    try {
      const p = await getData(API.SET_LINE, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data: lists
      } } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists: lists.map(list => {
          const {
            id, enter_year,
            major,
            min_achivement
          } = list
          return {
            id,
            enter_year,
            major: major.title,
            department: major.department.title,
            score: min_achivement
          }
        }),
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }

      dispatch(createAction(ACTION.SET_LINE)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}

export const getSetProject = params => {
  console.log(params)
  return async (dispatch) => {
    try {
      const p = await getData(API.SET_PROJECT, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data: lists
      } } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists,
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }
      dispatch(createAction(ACTION.SET_PROJECT)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}

export const getSetProjectInfo = params => {
  console.log(params)
  return async (dispatch) => {
    try {
      const p = await getData(API.SET_PROJECT_INFO, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data: lists
      } } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists: lists.map(list => {
          const { course, id, term } = list
          return {
            key: id,
            course_type: course.course_type.title,
            terms: term.title,
            course_no: course.course_no,
            name: course.title,
            score: course.credit
          }
        }),
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }
      dispatch(createAction(ACTION.SET_PROJECT_INFO)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}

export const getSetSupport = params => {
  console.log(params)
  return async (dispatch) => {
    try {
      const p = await getData(API.SET_SUPPORT, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data: lists
      } } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists: lists.map(list => {
          const { number, enter_year, major, graduate_requirement, title: content, weight, id } = list
          return {
            key: id,
            number: graduate_requirement.number,
            enter_year,
            major: major.title,
            support: graduate_requirement.number + '.' + number,
            content,
            weight
          }
        }),
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }
      dispatch(createAction(ACTION.SET_SUPPORT)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}
export const getSetSupportInfo = params => {
  console.log(params)
  return async (dispatch) => {
    try {
      const p = await getData(API.SET_SUPPORT_INFO, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data: lists
      } } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists: lists.map(list => {
          const { training_plan, weight, id } = list
          const { course: { course_no, title: courses, credit: score } } = training_plan
          return {
            key: id,
            course_no,
            courses,
            score,
            weight
          }
        }),
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }
      dispatch(createAction(ACTION.SET_SUPPORT_INFO)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}
export const getSetOutLine = params => {
  console.log(params)
  return async (dispatch) => {
    try {
      const p = await getData(API.SET_PROJECT_INFO, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data: lists
      } } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists: lists.map(list => {
          const { course, enter_year, major, target_count: number, id, outline_id } = list

          return {
            id,
            enter_year,
            major: major.title,
            course_no: course.course_no,
            courses: course.title,
            score: course.credit,
            number,
            outline_id
          }
        }),
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }
      dispatch(createAction(ACTION.SET_OUTLINE)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}

export const getSetOutLineInfo = params => {
  return async (dispatch) => {
    try {
      const p = await getData(API.SET_OUTLINE_INFO, params)
      const { errcode, data: lists
      } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = lists.map(list => {
        const { id, number, title: target, graduate_explain, training_plan, weight } = list
        return {
          id,
          number,
          target,
          support: graduate_explain.number + '.' + graduate_explain.graduate_requirement.number,
          weight,
          training_plan
        }
      })
      dispatch(createAction(ACTION.SET_OUTLINE_INFO)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}


export const getSetTable = params => {
  return async (dispatch) => {
    try {
      const p = await getData(API.SET_PROJECT, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data: lists
      }
      } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists,
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }
      dispatch(createAction(ACTION.SET_TABLE)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}

export const getSetShare = params => {
  return async (dispatch) => {
    try {
      const p = await getData(API.SET_PROJECT_INFO, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data: lists
      }
      } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists: lists.map(list => {
          const { term, id, enter_year, major, course: { course_no, title: courses }, teachers } = list
          return {
            id,
            terms: term.title,
            enter_year,
            major: major.title,
            course_no,
            courses,
            teacher: teachers.join(',')
          }
        }),
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }
      dispatch(createAction(ACTION.SET_SHARE)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}
export const getSetManage = params => {
  return async (dispatch) => {
    try {
      const p = await getData(API.SET_MANAGE, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data: lists
      }
      } = p
      if (errcode !== 0) {
        throw new Error(p.message)
      }
      const payload = {
        lists: lists.map(list => {
          const { id, title: name, department, teacher, training_plans } = list
          const { name: leader } = teacher
          let teachers = []
          let courses = []
          training_plans.forEach(item => {
            courses = [...courses, item.course.course_no + ' ' + item.course.title]
            teachers = [...teachers, item.teachers.join(',') || '暂无']
          })
          return {
            id,
            name,
            leader,
            courses,
            department: department.title,
            teacher: teachers
          }
        }),
        page: {
          page_size: per_page * 1,
          page: current_page,
          total
        }
      }
      dispatch(createAction(ACTION.SET_MANAGE)(payload))
    } catch (error) {
      message.error(error)
    }
  }
}