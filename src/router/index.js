import Loadable from 'component/Loading'



export const HomeRoute = {
  pathname: '/home',
  meta: {
    title: '首页',
    icon: 'android'
  },
  component: Loadable('Home'),
  redirect: '/home/index',
  children: [
    {
      pathname: '/home/index',
      meta: {
        title: '首页-INDEX',
        icon: 'aliwangwang'
      },
      component: Loadable('Home/First')
    }
  ]

}

export const navRoutes = [
  HomeRoute,
  {
    pathname: '/child',
    meta: {
      title: '子页面',
      icon: 'apple'
    },
    component: Loadable('Child')
  }
]



