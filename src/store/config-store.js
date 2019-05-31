import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import podcastReducer from '../reducers/podcast'
import thunk from 'redux-thunk'

const initialState = {}

export default () => {
  const store = createStore(
    combineReducers({
      podcast: podcastReducer
    }),
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  return store
}
