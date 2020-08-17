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
  loader: ()=>import('../pages/detail/detail')
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
  }
]

// export { Home, User, Goods, Detail }