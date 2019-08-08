import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import activityReducer from '../reducers/activity'
import podcastReducer from '../reducers/podcast'
import playerReducer from '../reducers/player'
import themeReducer from '../reducers/theme'
import thunk from 'redux-thunk'

const initialState = {}

export default () => {
  const store = createStore(
    combineReducers({
      activity: activityReducer,
      podcast: podcastReducer,
      player: playerReducer,
      theme: themeReducer
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
