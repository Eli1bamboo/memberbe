import axios from 'axios'

import { USERS_FETCHED, FAILED_USERS_FETCHED } from './types'

import { API_URL } from '../../utils/Constants'

export const fetchUsers = () => async (dispatch) => {
  try {
    await axios({
      method: 'GET',
      url: `${API_URL}users`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((response) => {
        if (response.data.status === 'ok') {
          dispatch({
            type: USERS_FETCHED,
            payload: {
              token: response.data.token,
              user: response.data.users
            }
          })
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  } catch (err) {
    dispatch({
      type: FAILED_USERS_FETCHED,
      payload: {
        success: false,
        message: 'Unable to connect to authentication server'
      }
    })
  }
}
