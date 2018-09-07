import React, { Component } from 'react'

import Login from '../Pages/Login'

import { Route } from 'react-router-dom'

class Layout extends Component {
  handleSelectRoute = (route) => {
    const { history } = this.props
    history.push(`/${route}`)
  }
  // <ul style={flexContainer}>
  //         <li onClick={() => this.handleSelectRoute('login')}>Login</li>
  //       </ul>
  render () {
    return <Route exact path='/' component={Login} />
  }
}

export default Layout
