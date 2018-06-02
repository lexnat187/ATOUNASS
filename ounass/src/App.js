import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import SearchBar from './components/Search'
import Filters from './components/Filters'
import Products from './components/Products'

import * as reducers from './reducers'

import logo from './assets/images/logo_en.svg';
import './App.css';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const store = createStore(
  reducer,
  ['initial'],
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

class App extends Component {

  render() {
    return (
      <Provider store={store}>

        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <SearchBar />
          <Filters />
          <Products />
        </div>
      </Provider>

    )
  }
}

export default App;
