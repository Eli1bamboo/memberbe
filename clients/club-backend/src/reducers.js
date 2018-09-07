import { combineReducers } from 'redux'
import loginPage from './views/LoginPage/reducer'
import userProfile from './views/UserProfile/reducer'

const clubApp = combineReducers({
  loginPage,
  userProfile
})

export default clubApp
