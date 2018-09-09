import axios from 'axios'
import _isEmpty from 'lodash/isEmpty'

import { FETCH_USER, LOGIN_USER, LOGIN_FAILED } from './types'
import { API_URL } from '../../utils/Constants'

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/Account/GetUser')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const loginUser = (email, password) => async (dispatch) => {
  try {
    await axios
      .post(`${API_URL}users/login`, {
        email,
        password
      })
      .then((response) => {
        const message = response.data.message || null

        const isTokenEmpty = _isEmpty(response.data.token)

        if (!isTokenEmpty) {
          localStorage.setItem('token', response.data.token)
        }

        dispatch({
          type: LOGIN_USER,
          payload: {
            token: response.data.token,
            user: response.data.user,
            success: response.data.status,
            message
          }
        })
      })
      .catch((error) => {
        console.log('error', error)
      })
  } catch (err) {
    dispatch({
      type: LOGIN_FAILED,
      payload: {
        success: false,
        message: 'Unable to connect to authentication server'
      }
    })
  }
}
