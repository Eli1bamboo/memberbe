import React, { Component, Fragment } from 'react'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { loginUser } from '../../Pages/Login/actions'

import { withRouter } from 'react-router-dom'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

class LogoutButton extends Component {
  shouldComponentUpdate () {
    return true
  }

  doLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('isAuth')
  }

  handleLogout = () => {
    const { history } = this.props

    this.doLogout()

    history.push('/')
  }

  render () {
    return (
      <Fragment>
        <ListItemIcon onClick={this.handleLogout}>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText primary='Log out' onClick={this.handleLogout} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { login } = state

  return {
    login
  }
}

const mapDispatchToProps = {
  loginUser
}

const enhance = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhance(LogoutButton)
