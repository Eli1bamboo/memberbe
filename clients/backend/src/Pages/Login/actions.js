import axios from 'axios'

import { FETCH_USER, LOGIN_USER, LOGIN_FAILED } from './types'

const api = 'http://localhost:9020/users/login'

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/Account/GetUser')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const res = await axios
      .post(api, {
        email: email,
        password: password
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        const message = response.data ? '' : 'Incorrect email or password'
        dispatch({
          type: LOGIN_USER,
          payload: {
            user: response.data.user,
            success: response.data.status,
            message
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (ex) {
    console.log('Login Failed:', ex)
    dispatch({
      type: LOGIN_FAILED,
      payload: {
        success: false,
        message: 'Unable to connect to authentication server'
      }
    })
  }
}
