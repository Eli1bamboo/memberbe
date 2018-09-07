import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import LayersIcon from '@material-ui/icons/Layers'
import AssignmentIcon from '@material-ui/icons/Assignment'

class Navigation extends Component {
  render() {
    console.log(this.props)
    return (
      <Fragment>
        <List>
          <Link to="/dashboard">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
          </Link>
          <Link to="/users">
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='Users' />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary='Orders' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary='Reports' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary='Integrations' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListSubheader inset>Saved reports</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Current month' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Last quarter' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Year-end sale' />
          </ListItem>
        </List>
      </Fragment >
    )
  }
}

export default Navigation