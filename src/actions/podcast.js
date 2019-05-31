import axios from 'axios'

export const fetchPodcast = url => dispatch => {
  // Make GET request to Node service to parse RSS feed and send back JSON
  axios({
    method: 'GET',
    timeout: 25 * 1000,
    url: `https://xmlparse.glitch.me/?url=${url}`
  })
    .then(res => {
      // Pull out necessary podcast data
      const channel = res.data.rss.channel

      const title = channel.title._text
      const description =
        channel.description._cdata || channel.description._text
      const img = channel.image.url._text.replace(/http:\/\//, 'https://')
      const episodes = channel.item.filter(e => e.hasOwnProperty('enclosure'))

      // Set app state with podcast data
      dispatch({
        type: 'FETCH_PODCAST',
        podcast: {
          img,
          title,
          episodes,
          description
        }
      })
    })
    // Set error ir request timesout
    .catch(err => {
      if (err.code == 'ECONNABORTED') {
        console.log('error', err)
      }
    })
}