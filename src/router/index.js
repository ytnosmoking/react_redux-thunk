import React from 'react'

import Loadable from 'component/Loading'
import SwitchRoute from 'component/SwitchRoute'


export const HomeRoute = {
  pathname: '/home',
  meta: {
    title: '达成度统计',
    icon: 'android'
  },
  // component: Loadable('Home'),
  component: () => <SwitchRoute routes={HomeRoute} />,
  redirect: '/home/need',
  children: [
    {
      pathname: '/home/need',
      meta: {
        title: '达成度统计-毕业要求',
        icon: 'aliwangwang'
      },
      component: Loadable('Home/Need')
    },
    {
      pathname: '/home/student',
      meta: {
        title: '学生毕业要求达成度',
        icon: 'weibo'
      },
      component: Loadable('Home/Student')
    },
    {
      pathname: '/home/support',
      meta: {
        title: '达成度统计-支持点',
        icon: 'skype'
      },
      component: Loadable('Home/Support')
    },
    {
      pathname: '/home/course',
      meta: {
        title: '达成度统计-课程组',
        icon: 'google-plus'
      },
      component: Loadable('Home/Course')
    }
  ]
}




export const CoursesRoute = {
  pathname: '/course',
  meta: {
    title: '课程达成度',
    icon: 'apple'
  },
  component: () => <SwitchRoute routes={CoursesRoute} />,
  redirect: '/course/manage',
  children: [
    {
      pathname: '/course/manage',
      meta: {
        title: '课程管理',
        icon: 'dingding'
      },
      component: Loadable('Course/Manage'),
    },
    {
      pathname: '/course/target',
      meta: {
        title: '课程目标达成度',
        icon: 'twitter'
      },
      component: Loadable('Course/Target'),
    }
  ]
}

export const SetRoute = {
  pathname: '/set',
  meta: {
    title: '毕业目标设置',
    icon: 'windows'
  },
  component: () => <SwitchRoute routes={SetRoute} />,
  redirect: '/set/need',
  children: [
    {
      pathname: '/set/need',
      meta: {
        title: '毕业要求',
        icon: 'weibo-square'
      },
      component: Loadable('Set/Need'),
    },
    {
      pathname: '/set/line',
      meta: {
        title: '毕业目标达标线',
        icon: 'wechat'
      },
      component: Loadable('Set/Line'),
    },
    {
      pathname: '/set/project',
      meta: {
        title: '专业培养方案',
        icon: 'medium-workmark'
      },
      component: Loadable('Set/Project'),
    },
    {
      pathname: '/set/support',
      meta: {
        title: '专业支撑点',
        icon: 'facebook'
      },
      component: Loadable('Set/Support'),
    },
    {
      pathname: '/set/outline',
      meta: {
        title: '课程大纲',
        icon: 'alipay'
      },
      component: Loadable('Set/OutLine'),
    },
    {
      pathname: '/set/table',
      meta: {
        title: '实现矩阵详表',
        icon: 'alipay'
      },
      component: Loadable('Set/Table'),
    },
    {
      pathname: '/set/share',
      meta: {
        title: '课程分配',
        icon: 'slack-square'
      },
      component: Loadable('Set/Share'),
    },
    {
      pathname: '/set/manage',
      meta: {
        title: '课程大纲',
        icon: 'yuque'
      },
      component: Loadable('Set/Manage'),
    },
  ]
}
export const DicRoute = {
  pathname: '/dictionary',
  meta: {
    title: '字典管理',
    icon: 'ie'
  },
  component: () => <SwitchRoute routes={DicRoute} />,
  redirect: '/dictionary/college',
  children: [
    {
      pathname: '/dictionary/college',
      meta: {
        title: '学院',
        icon: 'weibo-circle'
      },
      component: Loadable('Dictionary/College'),
    },
    {
      pathname: '/dictionary/department',
      meta: {
        title: '系',
        icon: 'youtube'
      },
      component: Loadable('Dictionary/Department'),
    },
    {
      pathname: '/dictionary/major',
      meta: {
        title: '专业',
        icon: 'gitlab'
      },
      component: Loadable('Dictionary/Major'),
    },
    {
      pathname: '/dictionary/classes',
      meta: {
        title: '专业班级',
        icon: 'codepen'
      },
      component: Loadable('Dictionary/Classes'),
    },
    {
      pathname: '/dictionary/term',
      meta: {
        title: '学期',
        icon: 'behance'
      },
      component: Loadable('Dictionary/Term'),
    },
    {
      pathname: '/dictionary/courses',
      meta: {
        title: '课程类别',
        icon: 'ant-design'
      },
      component: Loadable('Dictionary/Courses'),
    },

  ]
}
export const ManageRoute = {
  pathname: '/manage',
  meta: {
    title: '基本信息管理',
    icon: 'chrome'
  },
  component: () => <SwitchRoute routes={ManageRoute} />,
  redirect: '/manage/course',
  children: [
    {
      pathname: '/manage/course',
      meta: {
        title: '课程管理',
        icon: 'taobao-circle'
      },
      component: Loadable('Manage/Course'),
    },
    {
      pathname: '/manage/teacher',
      meta: {
        title: '教师管理',
        icon: 'medium'
      },
      component: Loadable('Manage/Teacher'),
    },
    {
      pathname: '/manage/student',
      meta: {
        title: '学生管理',
        icon: 'code-sandbox'
      },
      component: Loadable('Manage/Student'),
    },
  ]
}

export const OtherRoute = {
  pathname: '/record',
  meta: {
    title: '上传记录',
    icon: 'chrome'
  },
  component: Loadable('Other/Record'),
  // component: () => <SwitchRoute routes={ManageRoute} />,
  // redirect: '/manage/course',
  // children: [
  //   {
  //     pathname: '/manage/course',
  //     meta: {
  //       title: '课程管理',
  //       icon: 'taobao-circle'
  //     },
  //     component: Loadable('Manage/Course'),
  //   },

  // ]
}




export const navRoutes = [
  HomeRoute,
  CoursesRoute,
  SetRoute,
  DicRoute,
  ManageRoute,
  OtherRoute
]



