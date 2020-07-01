import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import podcastReducer from '../reducers/podcast'
import playerReducer from '../reducers/player'
import settingsReducer from '../reducers/settings'
import thunk from 'redux-thunk'

const initialState = {}

export default () => {
  const store = createStore(
    combineReducers({
      podcast: podcastReducer,
      player: playerReducer,
      settings: settingsReducer,
    }),
    initialState,
    compose(
      applyMiddleware(thunk)
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  return store
}
