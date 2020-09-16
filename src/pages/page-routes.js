import Loadable from 'react-loadable'
import React from 'react'

function Loading(){
  return <div>loading...</div>
}
const component = 'home'
const Home = Loadable({
  loading: Loading,
  loader: ()=>import(`../pages/${component}`)
})
const User = Loadable({
  loading: Loading,
  loader: ()=>import('../pages/user/index')
})
const Goods = Loadable({
  loading: Loading,
  loader: ()=>import('../pages/goods/goods')
})
const Detail = Loadable({
  loading: Loading,
  loader: ()=>import('../pages/detail/index')
})
const Nest = Loadable({
  loading: Loading,
  loader: ()=>import('../pages/nest/index')
})
const Nest1 = Loadable({
  loading: Loading,
  loader: ()=>import('../pages/nest/nest1-1/index')
})
const Table = Loadable({
  loading: Loading,
  loader: ()=>import('../pages/table/index')
})
const Upload = Loadable({
  loading: Loading,
  loader: ()=>import('./Demo/upload/index')
})
const Tree = Loadable({
  loading: Loading,
  loader: ()=>import('./Demo/tree/index')
})
const CheckBox = Loadable({
  loading: Loading,
  loader: ()=>import('./Demo/checkBox/index')
})
const ProcssDsign = Loadable({
  loading: Loading,
  loader: ()=>import('./design/index')
})

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/nest/2',
    component: Nest
  },
  {
    path: '/nest/1',
    component: Nest1
  },
  {
    path: '/table',
    component: Table
  },
  {
    path: '/upload',
    component: Upload
  },
  {
    path: '/tree',
    component: Tree
  },
  {
    path: '/checkBox',
    component: CheckBox
  },
  {
    path: '/process/design',
    component: ProcssDsign
  }
]

// export { Home, User, Goods, Detail }