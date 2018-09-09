import { combineReducers } from 'redux'
import login from './Pages/Login/reducer'
import users from './Pages/Users/reducer'

const backendStore = combineReducers({
  login,
  users
})

export default backendStore
