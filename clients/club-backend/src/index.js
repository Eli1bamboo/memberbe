import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'

import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import clubApp from './reducers'

import 'assets/css/material-dashboard-react.css?v=1.4.1'

import indexRoutes from 'routes/index.js'

const hist = createBrowserHistory()

const api = 'https://swapi.co/api'

let store = createStore(
  clubApp,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

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
