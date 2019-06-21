import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ReactDOM from 'react-dom'
import App from './components/App'
import HomePage from './pages/Home'
import NotFound from './pages/NotFound'
import Sidebar from './components/Sidebar'
import Controls from './components/Controls'
import MobileNav from './components/MobileNav'
import NowPlayingPage from './pages/NowPlaying'

import { Provider } from 'react-redux'
import configureStore from './store/config-store'
import throttle from 'lodash.throttle'

import podcasts from './data/podcasts'

import './css/styles.css'
import './css/themes/light.css'
import './css/themes/dark.css'

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('playerState', serializedState)
  } catch (err) {
    console.log(err)
  }
}

const store = configureStore()

store.subscribe(
  throttle(() => {
    console.log('[REDUX] Saving state')
    saveState({
      playerState: { ...store.getState().player, playStatus: 'PAUSED' }
    })
  }, 1000)
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MobileNav />
      <div className='app-wrapper'>
        <div>
          <Sidebar list={podcasts} />
        </div>
        <div className='app-wrapper-content'>
          <Controls />
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/nowplaying' exact component={NowPlayingPage} />
            <Route path='/podcast/:podcast' exact component={App} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
