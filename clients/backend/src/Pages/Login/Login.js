import React, { Component } from 'react'

import { compose } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'

import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = (theme) => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMsg: '',
      formData: { email: '', password: '' }
    }

    // console.log('loggedIn:', this.props.login)
  }

  handleChange = (event, value) => {
    const loginState = { ...this.state.formData }

    loginState[value] = event.target.value

    this.setState({ formData: loginState })
  }

  handleSubmit = () => {
    const { formData } = this.state

    try {
      this.props.loginUser(formData.email, formData.password).then(() => {
        // console.log('thisprops', this.props)
      })
    } catch (ex) {
      this.setState({ errorMsg: 'Unable to connect to server' })
      console.log('error', ex)
    }
  }

  render () {
    const { classes } = this.props
    const { formData } = this.state

    console.log(this.state, this.props)

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant='headline'>Sign in</Typography>
            <form className={classes.form}>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='email'>Email Address</InputLabel>
                <Input
                  type='email'
                  id='email'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  value={formData.email}
                  onChange={(e) => this.handleChange(e, 'email')}
                />
              </FormControl>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input
                  name='password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={formData.password}
                  onChange={(e) => this.handleChange(e, 'password')}
                />
              </FormControl>
              <Button
                onClick={this.handleSubmit}
                type='button'
                fullWidth
                variant='raised'
                color='primary'
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps ({ login }) {
  return { login }
}

const enhance = compose(withStyles(styles), connect(mapStateToProps, actions))

export default enhance(Login)
