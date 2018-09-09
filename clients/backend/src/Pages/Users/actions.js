import axios from 'axios'

import { USERS_FETCHING, USERS_FETCHED, USERS_FETCH_FAILED } from './types'

import { API_URL } from '../../utils/Constants'

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USERS_FETCHING,
      payload: {
        isSearching: true
      }
    })
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
              isSearching: false,
              users: response.data.users
            }
          })
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  } catch (err) {
    dispatch({
      type: USERS_FETCH_FAILED,
      payload: {
        isSearching: false,
        message: 'Unable to fetch users'
      }
    })
  }
}
