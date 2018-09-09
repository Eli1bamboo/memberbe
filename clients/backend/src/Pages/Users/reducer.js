import { USERS_FETCHING, USERS_FETCHED, USERS_FETCH_FAILED } from './types'

const initialState = {
  users: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case USERS_FETCHING:
      return {
        isSearching: true
      }

    case USERS_FETCHED:
      return {
        isSearching: false,
        users: action.payload.users
      }
    case USERS_FETCH_FAILED:
      return { success: false, message: action.payload.message }
    default:
      return state
  }
}
