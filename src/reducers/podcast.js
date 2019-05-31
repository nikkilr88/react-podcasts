const podcastState = {
  title: '',
  description: '',
  img: '',
  episodes: []
}

const podcastReducer = (state = podcastState, action) => {
  switch (action.type) {
    case 'FETCH_PODCAST':
      return {
        ...action.podcast
      }
    default:
      return state
  }
}

export default podcastReducer
