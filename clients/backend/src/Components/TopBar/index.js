import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'
import PersonIcon from '@material-ui/icons/Person'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import ProgressBar from '../ProgressBar'
import LogoutButton from '../LogoutButton'

import { Divider } from '../../../node_modules/@material-ui/core'

const drawerWidth = 240

const styles = (theme) => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar
})

class TopBar extends Component {
  constructor(props) {
    super()

    this.state = {
      anchorEl: null,
      isSearching: false
    }
  }

  componentWillMount() {
    const { users } = this.props

    const { isSearching } = users

    this.setState({
      isSearching
    })
  }

  componentWillReceiveProps(nextProps) {
    const { users } = nextProps

    const { isSearching } = users

    this.setState({
      isSearching
    })
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  navigateTo = (url) => {
    const { history } = this.props
    history.push(url)
  }

  render() {
    const { classes, pageTitle } = this.props
    const { anchorEl, isSearching } = this.state

    const open = Boolean(anchorEl)

    return (
      <AppBar
        position='absolute'
        className={classNames(
          classes.appBar,
          this.props.open && classes.appBarShift
        )}
      >
        <Toolbar disableGutters={!this.props.open} className={classes.toolbar}>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={this.props.handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              this.props.open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='title'
            color='inherit'
            noWrap
            className={classes.title}
          >
            {pageTitle}
          </Typography>
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup='true'
              onClick={this.handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                <ListItemIcon
                  className={classes.icon}
                  onClick={() => this.navigateTo('user-profile')}
                >
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.primary }}
                  inset
                  primary='My Profile'
                  onClick={() => this.navigateTo('user-profile')}
                />
              </MenuItem>
              <Divider />
              <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                <LogoutButton history={this.props.history} />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
        {isSearching ? <ProgressBar /> : null}
      </AppBar>
    )
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const { users } = state

  return {
    users
  }
}

const enhance = compose(withStyles(styles), connect(mapStateToProps))

export default enhance(withRouter(TopBar))
