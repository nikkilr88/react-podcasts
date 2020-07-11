import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import throttle from 'lodash.throttle'
import { ThemeProvider } from 'styled-components'

// Router & Store
import AppRouter from './routers'
import configureStore from './store/config-store'

// Components
import Unsupported from './components/common/Unsupported.component'

// Data
import themes from './themes'

// Styles
import GlobalStyles from './index.styles'

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
      playerState: { ...store.getState().player, playStatus: 'PAUSED' },
    })
  }, 1000)
)

const ThemeWrapper = ({ children, theme }) => (
  <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
)

const mapStateToProps = state => ({
  theme: state.settings.theme,
})

const ConnectedThemeWrapper = connect(mapStateToProps)(ThemeWrapper)

// Render 'Unsupported' component if user is on IE
// Render app for any other browsers
ReactDOM.render(
  <Fragment>
    <GlobalStyles />
    {document.documentMode ? (
      <Unsupported />
    ) : (
      <Provider store={store}>
        <ConnectedThemeWrapper>
          <AppRouter />
        </ConnectedThemeWrapper>
      </Provider>
    )}
  </Fragment>,
  document.getElementById('root')
)
