import React, { Component } from 'react'

import LoginPage from '../LoginPage'

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
    return (
      <div>
        <div>
          <Route exact path='/' component={LoginPage} />
        </div>
      </div>
    )
  }
}

export default Layout
