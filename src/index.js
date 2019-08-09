import React from 'react'
import AppRouter from './routers'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import configureStore from './store/config-store'
import throttle from 'lodash.throttle'

import './css/styles.styles.css'
import './css/themes/light.css'
import './css/themes/dark.css'

const saveState = state => {
  try {
    console.log('[LOCAL_STORAGE] Saving state')

    const serializedState = JSON.stringify(state)
    localStorage.setItem('playerState', serializedState)
  } catch (err) {
    console.log('[LOCAL_STORAGE] Error: ', err)
  }
}

const store = configureStore()

store.subscribe(
  throttle(() => {
    saveState({
      playerState: { ...store.getState().player, playStatus: 'PAUSED' }
    })
  }, 1000)
)

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
)
