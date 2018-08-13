import './assets/less/AdminLTE.css';
import './assets/less/skins/all-skins.css';
// import '../../../../../src/index.scss';
import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// add IndexRoute above and the helpers below
import {
  checkIndexAuthorization,
  checkBasicAuthorization,
} from './lib/check-auth'

import App from './App'
import Login from './login'
import Countries from './countries';
import CountryAdd from './country';
import './index.css'

import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

const sagaMiddleware = createSagaMiddleware();
import logger from 'redux-logger'

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(logger, sagaMiddleware)), // allows redux devtools to watch sagas
)

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute onEnter={checkIndexAuthorization(store)} />
        <Route path="/login" component={Login} />
        <Route onEnter={checkBasicAuthorization(store)} path="/countries" component={Countries} />
        <Route onEnter={checkBasicAuthorization(store)} path="/add-country" component={CountryAdd} />
        <Route onEnter={checkBasicAuthorization(store)}path="/edit-country/:id" component={CountryAdd} />
      {/* //  <Route onEnter={checkWidgetAuthorization(store)} path="/widgets" component={Widgets} /> */}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
