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
    url: `https://xmlparse.glitch.me/?url=${url}`
  })
    .then(res => {
      const channel = res.data.rss.channel
      const title = channel.title._text || channel.title._cdata
      const description =
        channel.description._cdata || channel.description._text
      const img = channel.image.url._text.replace(/http:\/\//, 'https://')
      const episodes = channel.item.filter(e => e.hasOwnProperty('enclosure'))
      const website = channel.link._text
      const author = channel['itunes:author']._text

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
