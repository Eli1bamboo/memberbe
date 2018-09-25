import React, { Component } from 'react'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { loginUser } from './actions'

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
import Snackbar from '@material-ui/core/Snackbar'
import Fade from '@material-ui/core/Fade'

import withStyles from '@material-ui/core/styles/withStyles'

import _isEmpty from 'lodash/isEmpty'

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
      isMounted: false,
      openSnackbar: false,
      errorMsg: '',
      formData: { email: '', password: '' }
    }
  }

  componentDidMount(){
    this.setState({
      isMounted: true
    })
  }
  
  componentWillReceiveProps (nextProps) {
    const { history } = this.props

    const isAuth = localStorage.getItem('isAuth')

    if (isAuth) {
      history.push('/dashboard')
    }

    if (nextProps.login.message && nextProps.login.message.length) {
      this.setState({
        openSnackbar: true,
        errorMsg: nextProps.login.message
      })
    }
  }

  closeSnackbar = () => {
    this.setState({
      openSnackbar: false
    })
  }

  handleChange = (event, value) => {
    const loginState = { ...this.state.formData }

    loginState[value] = event.target.value

    this.setState({ formData: loginState })
  }

  handleSubmit = () => {
    const { loginUser } = this.props
    const { formData } = this.state

    loginUser(formData.email, formData.password)
  }

  render () {
    const { classes } = this.props
    const { formData, errorMsg, openSnackbar, isMounted } = this.state

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
        <Fade in={isMounted}>
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
                  required
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
                  required
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
          </Fade>
        </main>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={this.closeSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>{errorMsg}</span>}
        />
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
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

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(Login)
