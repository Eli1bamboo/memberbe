import { combineReducers } from 'redux'
import login from './Pages/Login/reducer'

const backendStore = combineReducers({
  login
})

export default backendStore
