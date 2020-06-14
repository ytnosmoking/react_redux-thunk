
import { message } from 'antd'
import { getData, postData } from 'utils/ajax'
import { API } from 'utils/api'
import { setItem, createAction, actionObj } from 'utils/tools'
import * as ACTION from './action_type'
// 所有设置的action 都可以不要了 利用createAction 动态生成action

export const Login = (params) => {
  return async(dispatch) => {
    const p = await postData(API.LOGIN, params)
    const { data: { token }, errcode } = p
    if (errcode === 0) {
      setItem('isLogin', token)
    }
    const userInfo = await getData(API.USER_INFO)
    const { data: info } = userInfo
    const payload = { isLogin: token, info }
    // dispatch(createAction(ACTION.LOGIN)(payload))
    console.log(1)
    // dispatch({ type: ACTION.LOGIN, payload })
    dispatch(actionObj(ACTION.LOGIN, payload))
    return p
  }
}

const getDetail = (p) => {
  const { errcode, data: {
    current_page,
    per_page,
    total,
    data: lists
  }} = p
  return {
    errcode, lists, page: {
      page_size: per_page * 1,
      page: current_page,
      total
    }
  }
}

// 专业
export const getMajors = (params = { page_size: 10, page: 1 }) => {
  return async(dispatch) => {
    const p = await getData(API.MAJOR, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    const payload = {
      lists: lists.map(list => ({ value: list.id, label: list.title })),
      page
    }
    dispatch(createAction(ACTION.MAJOR)(payload))
  }
}
// 学期
export const getTerms = (params = { page_size: 10, page: 1 }) => {
  return async(dispatch) => {
    const p = await getData(API.TERMS, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    const payload = {
      lists: lists.map(list => ({ value: list.id, label: list.title })),
      page
    }
    dispatch(createAction(ACTION.TERMS)(payload))
  }
}

// 要求 getRequireMents
export const getRequireMents = (params = { page_size: 10, page: 1 }) => {
  return async(dispatch) => {
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
  return async(dispatch) => {
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
  return async(dispatch) => {
    const p = await getData(API.DEPARTMENTS, params)
    console.log(p)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    const payload = {
      lists: lists.map(list => ({ value: list.id, label: list.title })),
      page
    }
    dispatch(createAction(ACTION.DEPARTMENTS)(payload))
  }
}
// 课程组长 老师
export const getTeacher = (params = { page_size: 10, page: 1 }) => {
  return async(dispatch) => {
    const p = await getData(API.TEACHERS, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    const payload = {
      lists: lists.map(list => ({ value: list.id, label: list.name })),
      page
    }
    dispatch(createAction(ACTION.TEACHERS)(payload))
  }
}

// Home
export const getHomeNeed = (params) => {
  return async(dispatch) => {
    const p = await getData(API.HOME_NEED, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.errmsg)
    }
    const payload = {
      lists: lists.map(item => ({ ...item, key: item.id })),
      page
    }
    dispatch(createAction(ACTION.HOME_NEED)(payload))
  }
}

export const getHomeStudent = (params) => {
  return async(dispatch) => {
    const p = await getData(API.HOME_STUDENT, params)
    const { errcode, page, lists } = getDetail(p)
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
      page
    }
    dispatch(createAction(ACTION.HOME_STUDENT)(payload))
  }
}

export const getHomeStudentInfo = (params) => {
  return async(dispatch) => {
    const p = await getData(API.HOME_STUDENT_INFO, params)
    const { errcode, page, lists } = getDetail(p)
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
          credit
        }
      }),
      page
    }
    dispatch(createAction(ACTION.HOME_STUDENT_INFO)(payload))
  }
}

export const getHomeSupport = (params) => {
  return async(dispatch) => {
    const p = await getData(API.HOME_SUPPORT, params)
    const { errcode, page, lists } = getDetail(p)
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
          support: graduate_requirement.number + '.' + graduate_explain.number
        }
      }),
      page
    }
    dispatch(createAction(ACTION.HOME_SUPPORT)(payload))
  }
}

export const getHomeCourse = (params) => {
  return async(dispatch) => {
    const p = await getData(API.HOME_COURSE, params)
    const { errcode, page, lists } = getDetail(p)
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
      page
    }
    dispatch(createAction(ACTION.HOME_COURSE)(payload))
  }
}

// Course
export const getCourseManage = params => {
  return async(dispatch) => {
    const p = await getData(API.COURSE_MANAGE, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => ({ key: list.id, ...list })),
      page
    }
    dispatch(createAction(ACTION.COURSE_MANAGE)(payload))
  }
}

export const getCourseManageScore = params => {
  return async(dispatch) => {
    const p = await getData(API.COURSE_MANAGE_SCORE, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => ({ key: list.id, ...list })),
      page
    }
    dispatch(createAction(ACTION.COURSE_MANAGE_SCORE)(payload))
  }
}

export const getCourseTarget = params => {
  return async(dispatch) => {
    const p = await getData(API.COURSE_TARGET, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => ({ key: list.id, ...list })),
      page
    }
    dispatch(createAction(ACTION.COURSE_TARGET)(payload))
  }
}

// Set
export const getSetLine = params => {
  return async(dispatch) => {
    const p = await getData(API.SET_LINE, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
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
      page
    }
    dispatch(createAction(ACTION.SET_LINE)(payload))
  }
}

export const getSetProject = params => {
  return async(dispatch) => {
    const p = await getData(API.SET_PROJECT, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists,
      page
    }
    dispatch(createAction(ACTION.SET_PROJECT)(payload))
  }
}

export const getSetProjectInfo = params => {
  return async(dispatch) => {
    const p = await getData(API.SET_PROJECT_INFO, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
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
      page
    }
    dispatch(createAction(ACTION.SET_PROJECT_INFO)(payload))
  }
}

export const getSetSupport = params => {
  return async(dispatch) => {
    try {
      const p = await getData(API.SET_SUPPORT, params)
      const { errcode, data: {
        current_page,
        per_page,
        total,
        data: lists
      }} = p
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
  return async(dispatch) => {
    const p = await getData(API.SET_SUPPORT_INFO, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => {
        const { training_plan, weight, id } = list
        const { course: { course_no, title: courses, credit: score }} = training_plan
        return {
          key: id,
          course_no,
          courses,
          score,
          weight
        }
      }),
      page
    }
    dispatch(createAction(ACTION.SET_SUPPORT_INFO)(payload))
  }
}

export const getSetOutLine = params => {
  return async(dispatch) => {
    const p = await getData(API.SET_PROJECT_INFO, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
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
      page
    }
    dispatch(createAction(ACTION.SET_OUTLINE)(payload))
  }
}

export const getSetOutLineInfo = params => {
  return async(dispatch) => {
    const p = await getData(API.SET_OUTLINE_INFO, params)
    const { errcode, data: lists
    } = p
    if (errcode !== 0) {
      return console.log(p.message)
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
  }
}

export const getSetTable = params => {
  return async(dispatch) => {
    const p = await getData(API.SET_PROJECT, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists,
      page
    }
    dispatch(createAction(ACTION.SET_TABLE)(payload))
  }
}

export const getSetShare = params => {
  return async(dispatch) => {
    const p = await getData(API.SET_PROJECT_INFO, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
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
      page
    }
    dispatch(createAction(ACTION.SET_SHARE)(payload))
  }
}

export const getSetManage = params => {
  return async(dispatch) => {
    const p = await getData(API.SET_MANAGE, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
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
      page
    }
    dispatch(createAction(ACTION.SET_MANAGE)(payload))
  }
}

export const getDicCollege = params => {
  return async(dispatch) => {
    const p = await getData(API.DIC_COLLEGE, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => {
        const { id, title: college, created_at: create_time } = list

        return {
          id,
          college,
          create_time
        }
      }),
      page
    }
    dispatch(createAction(ACTION.DIC_COLLEGE)(payload))
  }
}

export const getDicDepartment = params => {
  return async(dispatch) => {
    const p = await getData(API.DEPARTMENTS, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => {
        const { id, college: { title: college }, title: department, created_at: create_time } = list

        return {
          id,
          college,
          department,
          create_time
        }
      }),
      page
    }
    dispatch(createAction(ACTION.DIC_DEPARTMENT)(payload))
  }
}

export const getDicMajor = params => {
  return async(dispatch) => {
    const p = await getData(API.MAJOR, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => {
        const { id, department: { title: department, college: { title: college }}, title: major, created_at: create_time } = list

        return {
          id,
          college,
          department,
          major,
          create_time
        }
      }),
      page
    }
    dispatch(createAction(ACTION.DIC_MAJOR)(payload))
  }
}

export const getDicClasses = params => {
  return async(dispatch) => {
    const p = await getData(API.CLASSES, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => {
        const { id,
          major: {
            title: major,
            department: {
              title: department,
              college: {
                title: college
              }
            }
          },
          title,
          enter_year,
          created_at: create_time } = list

        return {
          id,
          college,
          department,
          major,
          class: title,
          enter_year,
          create_time
        }
      }),
      page
    }
    dispatch(createAction(ACTION.DIC_CLASSES)(payload))
  }
}

export const getDicTerms = params => {
  return async(dispatch) => {
    const p = await getData(API.TERMS, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => {
        const { id,
          title: terms,
          created_at: create_time } = list
        return {
          id,
          terms,
          create_time
        }
      }),
      page
    }
    dispatch(createAction(ACTION.DIC_TERMS)(payload))
  }
}

export const getDicCourseType = params => {
  return async(dispatch) => {
    const p = await getData(API.COURSETYPE, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => {
        const { id,
          title: course_type,
          created_at: create_time } = list
        return {
          id,
          course_type,
          create_time
        }
      }),
      page
    }
    dispatch(createAction(ACTION.DIC_COURSETYPE)(payload))
  }
}

export const getManageCourse = params => {
  return async(dispatch) => {
    const p = await getData(API.COURSES, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => {
        const { id,
          course_no,
          title,
          course_type: {
            title: course_type
          },
          credit: score } = list
        return {
          id,
          course_no,
          title,
          course_type,
          score
        }
      }),
      page
    }
    dispatch(createAction(ACTION.MANAGE_COURSES)(payload))
  }
}

export const getManageTeacher = params => {
  return async(dispatch) => {
    const p = await getData(API.TEACHERS, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => {
        const { id,
          name,
          teacher_no: number,
          roles: role,
          department
        } = list
        return {
          id,
          name,
          number,
          role,
          department: (department && department.title) || ''
        }
      }),
      page
    }
    dispatch(createAction(ACTION.MANAGE_TEACHER)(payload))
  }
}

export const getManageStudent = params => {
  return async(dispatch) => {
    const p = await getData(API.STUDENT, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => {
        const { id,
          class: {
            enter_year,
            title: classes,
            major: { title: major,
              department: {
                title: department
              }
            }
          },
          student_no: number,
          name,
          sex

        } = list
        return {
          id,
          enter_year,
          department,
          major,
          class: classes,
          number,
          name,
          sex
        }
      }),
      page
    }
    dispatch(createAction(ACTION.MANAGE_STUDENT)(payload))
  }
}
// record
export const getRecordUpload = params => {
  return async(dispatch) => {
    const p = await getData(API.RECORD, params)
    const { errcode, page, lists } = getDetail(p)
    if (errcode !== 0) {
      return console.log(p.message)
    }
    const payload = {
      lists: lists.map(list => {
        const { errors,
          handled_lines,
          id,
          lines,
          success_lines,
          teacher: { teacher_no: number, name, roles: role },
          work,
          updated_at

        } = list
        return {
          id,
          number,
          name,
          role,
          work: work || '',
          updated_at,
          lines,
          done: handled_lines,
          success: success_lines,
          fail: (errors && errors.length) || 0,
          errors
        }
      }),
      page
    }
    dispatch(createAction(ACTION.RECORD_UPLOAD)(payload))
  }
}
