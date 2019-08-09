import axios from 'axios'

export const setLoading = () => dispatch => {
  dispatch({
    type: 'SET_LOADING'
  })
}

export const fetchPodcast = url => dispatch => {
  dispatch({
    type: 'FETCH_PODCAST',
    loading: true,
    podcast: {
      title: undefined
    }
  })
  // Make GET request to Node service to parse RSS feed and send back JSON
  axios({
    method: 'GET',
    timeout: 25 * 1000,
    url: `https://podcast-parse.glitch.me/?url=${url}`
  })
    .then(res => {
      const channel = res.data.data

      const title = channel.title
      const website = channel.link
      const author = channel.author
      const episodes = channel.episodes
      const description = channel.description.short || channel.description.long
      const img = channel.image.replace(/http:\/\//, 'https://')

      dispatch({
        type: 'FETCH_PODCAST',
        loading: false,
        podcast: {
          img,
          title,
          author,
          website,
          episodes,
          description
        }
      })
    })
    .catch(err => {
      let errorMsg =
        err.code == 'ECONNABORTED'
          ? 'Oh-oh, this is taking longer that usual...'
          : 'Oh-oh, something went wrong ...'

      dispatch({
        type: 'SET_ERROR',
        error: errorMsg
      })
    })
}
