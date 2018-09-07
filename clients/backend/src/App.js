import React, { Component } from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import thunk from 'redux-thunk'

import backendStore from './reducers'

import Routes from './Routes'

const api = 'http://localhost:9020/'

let store = createStore(
  backendStore,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Route component={Routes} />
        </Router>
      </Provider>
    )
  }
}

export default App
