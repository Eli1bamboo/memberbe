import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'

class LogoutButton extends Component {
  shouldComponentUpdate() {
    return true
  }

  doLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  handleLogout = () => {
    const { history } = this.props

    this.doLogout()

    history.push('/')
  }

  render() {
    return (
      <Fragment>
        <ListItemIcon onClick={this.handleLogout}>
          <PowerSettingsNew />
        </ListItemIcon>
        <ListItemText primary='Log out' onClick={this.handleLogout} />
      </Fragment>
    )
  }
}

export default withRouter(LogoutButton)
