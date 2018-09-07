import axios from 'axios'
import _isEmpty from 'lodash/isEmpty'

import { USERS_FETCHED, FAILED_USERS_FETCHED } from './types'

const api = 'http://localhost:9020/products'

export const fetchUsers = () => async (dispatch) => {
  try {
    await axios({
      method: 'GET',
      url: `${api}`,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then((response) => {
      if (response.data.status === 'ok') {
        dispatch({
          type: USERS_FETCHED,
          payload: {
            token: response.data.token,
            user: response.data.users
          }
        })
      }
    }).catch((error) => {
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
