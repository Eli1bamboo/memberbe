import { combineReducers } from 'redux'
import loginPage from './LoginPage/reducer'

const backendStore = combineReducers({
  loginPage
})

export default backendStore
