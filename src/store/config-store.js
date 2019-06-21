import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import throttle from 'lodash.throttle'
import podcastReducer from '../reducers/podcast'
import playerReducer from '../reducers/player'
import themeReducer from '../reducers/theme'
import thunk from 'redux-thunk'

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('playerState', serializedState)
  } catch (err) {
    console.log(err)
  }
}

export default () => {
  const store = createStore(
    combineReducers({
      podcast: podcastReducer,
      player: playerReducer,
      theme: themeReducer
    }),
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  store.subscribe(
    throttle(() => {
      console.log('[REDUX] Saving state')
      saveState({
        playerState: { ...store.getState().player, playStatus: 'PAUSED' }
      })
    }, 1000)
  )

  return store
}
