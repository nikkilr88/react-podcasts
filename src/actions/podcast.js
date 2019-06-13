import axios from 'axios'

export const setLoading = () => dispatch => {
  dispatch({
    type: 'SET_LOADING'
  })
}

export const fetchPodcast = url => dispatch => {
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
      const description = channel.description.long
      const img = channel.image.replace(/http:\/\//, 'https://')

      dispatch({
        type: 'FETCH_PODCAST',
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
    // Set error ir request timesout
    .catch(err => {
      if (err.code == 'ECONNABORTED') {
        dispatch({
          type: 'SET_ERROR',
          error: 'Oh-oh, this is taking longer that usual...'
        })
      } else {
        console.log(err)
        dispatch({
          type: 'SET_ERROR',
          error: 'Oh-oh, something went wrong ...'
        })
      }
    })
}
