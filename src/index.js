import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ReactDOM from 'react-dom'
import App from './components/App'
import HomePage from './pages/Home'
import NotFound from './pages/NotFound'
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
      <div className='app-wrapper'>
        <div>
          <Sidebar list={podcasts} />
        </div>
        <div className='app-wrapper-content'>
          <Controls />
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/podcast/:podcast' exact component={App} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
