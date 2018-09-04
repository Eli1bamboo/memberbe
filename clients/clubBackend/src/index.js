import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { UpdateUser } from './redux/actions/user'

import { Provider } from 'react-redux'
import store from './redux/store/store'

import indexRoutes from './routes/'

import './assets/css/material-dashboard-react.css?v=1.4.0'

const hist = createBrowserHistory()

// Get user from local storage and send it to the store
const user = localStorage.getItem('user')
if (user && user !== 'undefined') store.dispatch(UpdateUser(JSON.parse(user)))

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
