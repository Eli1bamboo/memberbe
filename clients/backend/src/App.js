import React, { Component } from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import thunk from 'redux-thunk'

import backendStore from './reducers'

import Layout from './Layout'

let store = createStore(
  backendStore,
  compose(
    applyMiddleware(thunk.withExtraArgument()),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Route component={Layout} />
        </Router>
      </Provider>
    )
  }
}

export default App
