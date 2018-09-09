import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'

class LogoutButton extends Component {
  shouldComponentUpdate () {
    return true
  }

  handleLogout = () => {
    localStorage.removeItem('token')
  }

  render () {
    console.log(this.props)
    return (
      <ListItem button onClick={this.handleLogout}>
        <ListItemIcon>
          <PowerSettingsNew />
        </ListItemIcon>
        <ListItemText primary='Log out' />
      </ListItem>
    )
  }
}

export default LogoutButton
