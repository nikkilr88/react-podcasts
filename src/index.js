import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ReactDOM from 'react-dom'
import App from './components/App'
import HomePage from './pages/Home'
import Sidebar from './components/Sidebar'
import Controls from './components/Controls'

import { Provider } from 'react-redux'
import configureStore from './store/config-store'

import podcasts from './data/podcasts'

import './css/styles.css'
import './css/themes/light.css'
import './css/themes/dark.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Sidebar list={podcasts} />
      <Controls />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/podcast/:podcast' exact component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
