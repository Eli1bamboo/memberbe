import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { PrivateRoute } from './PrivateRoute'

import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard'
import Users from '../Pages/Users'
import UserProfile from '../Pages/UserProfile'

class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/users' component={Users} />
        <PrivateRoute exact path='/user-profile' component={UserProfile} />
      </Switch>
    )
  }
}

export default Routes
