import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { PrivateRoute } from './PrivateRoute'

import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard'

class Routes extends Component {
  componentWillReceiveProps () {
    console.log('recibio props')
  }

  render () {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </Switch>
    )
  }
}

export default Routes
