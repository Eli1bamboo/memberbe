import React, { Component } from 'react'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'

import ProgressBar from '../ProgressBar'

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
    transition: theme.transitions.create([ 'width', 'margin' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create([ 'width', 'margin' ], {
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
  constructor (props) {
    super()

    this.state = {
      isSearching: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const { users } = nextProps

    const { isSearching } = users

    this.setState({
      isSearching
    })
  }

  render () {
    const { classes, pageTitle } = this.props
    const { isSearching } = this.state

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
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
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

export default enhance(TopBar)
