import { LOGIN_USER, LOGIN_FAILED } from './types'

export default function (state = null, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        success: action.payload.success,
        message: action.payload.message,
        user: action.payload.user
      }
      break
    case LOGIN_FAILED:
      return { success: false, message: action.payload.message }
      break
    default:
      return { success: false, message: '' }
  }
}
