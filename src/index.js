import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import { Provider } from 'react-redux'
import configureStore from './store/config-store'
import { fetchPodcast } from './actions/podcast'

import './css/styles.css'
import './css/themes/light.css'
import './css/themes/dark.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
