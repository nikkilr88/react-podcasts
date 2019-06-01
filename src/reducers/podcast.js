const podcastState = {
  podcast: {
    title: '',
    description: '',
    img: '',
    episodes: []
  },
  error: '',
  loading: true
}

const podcastReducer = (state = podcastState, action) => {
  switch (action.type) {
    case 'FETCH_PODCAST':
      return {
        ...state,
        loading: false,
        podcast: action.podcast
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: 'Uh-oh, this is taking longer than expected...'
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default podcastReducer
