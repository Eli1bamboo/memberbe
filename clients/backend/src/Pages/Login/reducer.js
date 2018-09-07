import { LOGIN_USER, LOGIN_FAILED } from './types'

const initialState = {
  success: null,
  message: null,
  user: {}
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        success: action.payload.success,
        message: action.payload.message,
        user: action.payload.user
      }
    case LOGIN_FAILED:
      return { success: false, message: action.payload.message }
    default:
      return state
  }
}
