const podcastState = {
  podcast: {
    img: '',
    title: '',
    author: '',
    website: '',
    episodes: [],
    description: ''
  },
  error: '',
  loading: true
}

const podcastReducer = (state = podcastState, action) => {
  switch (action.type) {
    case 'FETCH_PODCAST':
      return {
        ...state,
        loading: action.loading,
        podcast: {
          ...state.podcast,
          ...action.podcast
        }
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'SET_LOADING':
      return {
        ...state,
        error: '',
        loading: true
      }
    default:
      return state
  }
}

export default podcastReducer
