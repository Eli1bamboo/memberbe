import { LOGING_USER, LOGED_USER, LOGIN_USER, LOGIN_FAILED } from './types'

const initialState = {
  success: null,
  message: null,
  user:
    localStorage.getItem('user') && localStorage.getItem('user').length
      ? JSON.parse(localStorage.getItem('user'))
      : {},
  isAuth:
    localStorage.getItem('user') && localStorage.getItem('user').length
      ? true
      : false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGING_USER:
      return {
        isLoading: action.payload.isLoading
      }
    case LOGED_USER:
      return {
        success: action.payload.success,
        message: action.payload.message,
        user: action.payload.user,
        isAuth: action.payload.isAuth
      }
    case LOGIN_FAILED:
      return { success: false, message: action.payload.message }
    default:
      return state
  }
}
