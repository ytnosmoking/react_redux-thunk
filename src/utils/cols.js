import React from 'react';
import { Progress } from 'antd'

const fixed = true
const width = 200
const defaultCol = (title = 'title', dataIndex = 'dataIndex', key = dataIndex, config = {}) => ({
  title,
  dataIndex,
  key,
  ...config
})
const enter_year = (config = {}) => {
  return {
    ...defaultCol('入学年份', 'enter_year'),
    ...config
  }
}
const major = (config = {}) => ({
  ...defaultCol('专业', 'major'),
  ...config
})
const student_no = (config = {}) => ({
  ...defaultCol('学号', 'student_no'),
  ...config
})
const name = (config = {}) => ({
  ...defaultCol('姓名', 'name'),
  ...config
})
const classes = (config = {}) => ({
  ...defaultCol('班级', 'class'),
  ...config
})

const progress = (config = {}) => ({
  ...defaultCol('进度', 'progress'),
  ...config
})
const average = (config = {}) => ({
  ...defaultCol('平均值', 'average'),
  ...config
})
const requireArr = Array(12).fill(1).map((item, index) => (
  defaultCol(`要求${index + 1}`, `achivement_${index + 1}`)
))

const course_type = (config = {}) => ({
  ...defaultCol('类别', 'course_type'),
  ...config
})
const course_no = (config = {}) => ({
  ...defaultCol('课程编号', 'course_no'),
  ...config
})

const score = (config = {}) => ({
  ...defaultCol('学分', 'score'),
  ...config
})


export const operation = (config = {}) => ({
  ...defaultCol('操作', 'operation'),
  ...config
})

// 达成度统计-毕业要求
export const HomeNeedCols = [
  enter_year({ fixed, width }),
  {
    ...major(), render: info => (
      <span>{info.title}</span>
    ),
    width: 160
  },
  {
    ...progress(),
    render: percent => (
      <Progress percent={percent * 100}></Progress>
    ),
    width: 200
  },
  average(),
  ...requireArr
]
//  学生毕业要求达成度
export const HomeStudentCols = [
  enter_year({ fixed, width: 100 }),
  student_no({ fixed, width: 180 }),
  name({ fixed, width: 100 }),
  {
    ...major(), render: info => (
      <span>{info.title}</span>
    ),
    width: 160
  },
  {
    ...classes(), render: info => (
      <span>{info.title}</span>
    ),
    width: 160
  },
  ...requireArr
]


export const HomeStudentInfoCols = [
  course_type({
    render: info => (
      <span>{info.title}</span>
    )
  }),
  course_no(),
  name({ title: '课程名称', dataIndex: 'title' }),
  score({ dataIndex: 'credit' })
]