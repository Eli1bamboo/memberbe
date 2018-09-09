import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'

import LogoutButton from '../LogoutButton'

class Navigation extends Component {
  render () {
    return (
      <Fragment>
        <List>
          <Link to='/dashboard'>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
          </Link>
          <Link to='/users'>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='Users' />
            </ListItem>
          </Link>
          <Link to='/user-profile'>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='User Profile' />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListSubheader inset>Saved reports</ListSubheader>
          <LogoutButton />
        </List>
      </Fragment>
    )
  }
}

export default Navigation
