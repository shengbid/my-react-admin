import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { isLogin } from 'src/commons'
import Login from 'src/pages/login/login';
import Template from '@/layout/template/template'

function AppRouter() {

  return (
    <Router>
      <div style={{display: 'flex', flexDirection: 'column', position: 'relative', minHeight: '100vh'}}>
        <Route exact  path="/login" component={Login} />
        <Route path="/" render={props => {
          if (props.location.pathname === '/login') {
            return null
          }
          if (!isLogin()) {
            return <Login />
          }
          return <Template {...props} />
        }} />
      </div>
    </Router>
  )
}


export default AppRouter
