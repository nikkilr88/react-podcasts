import React, { Component, Fragment } from 'react'
import axios from 'axios'

import SoundWrapper from './SoundWrapper'
import Sound from 'react-sound'
import Controls from './Controls'
import Header from './Header'
import Loader from './Loader'
import Sidebar from './Sidebar'
import Volume from './Volume'
import Episodes from './Episodes'

import { convertSeconds } from '../utils'

class App extends Component {
  state = {
    isLoading: true,
    title: '',
    description: '',
    img: '',
    episodes: [],
    track: { title: '', src: '' },
    position: 0,
    duration: 0,
    playingStatus: Sound.status.PLAYING,
    volume: 75,
    showVolume: false,
    theme: 'light', // light or dark
    error: ''
  }

  changeTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }))
  }

  // Update state with track information
  setAudio = (audio, title) => {
    this.setState(() => ({
      track: {
        title: title,
        src: audio
      },
      position: 0,
      playingStatus: Sound.status.PLAYING
    }))
  }

  // Pause audio
  pauseAudio = e => {
    e && e.target.blur()

    if (this.state.position > 0) {
      this.setState(prevState => ({
        playingStatus:
          prevState.playingStatus == Sound.status.PLAYING
            ? Sound.status.PAUSED
            : Sound.status.PLAYING
      }))
    }
  }

  // Stop audio
  stopAudio = e => {
    this.setState(() => ({
      position: 0,
      track: { title: '', src: '' }
    }))
  }

  // Fastforward track 10 seconds
  fastforward = e => {
    e && e.target.blur()

    if (this.state.position > 0) {
      this.setState(prevState => ({
        position: prevState.position + 1000 * 10
      }))
    }
  }

  // Rewind track 5 seconds
  rewind = e => {
    e && e.target.blur()

    if (this.state.position > 0) {
      this.setState(prevState => ({
        position: prevState.position - 1000 * 5
      }))
    }
  }

  // Handle track playback
  handleOnPlaying = data => {
    if (this.state.playingStatus === Sound.status.PLAYING) {
      this.setState(() => ({
        position: data.position,
        duration: data.duration
      }))
    }
  }

  handleOnFinishedPlaying = () => {
    this.setState(() => ({
      position: 1,
      playingStatus: Sound.status.PAUSED
    }))
  }

  handleOnError = err => {
    console.log(err)
  }

  showVolume = () => {
    if (this.timeout) {
      clearInterval(this.timeout)
    }

    this.setState(() => ({ showVolume: true }))

    this.timeout = setTimeout(() => {
      this.setState(() => ({ showVolume: false }))
    }, 1000)
  }

  // Set volume
  setVolume = e => {
    if (!this.state.track.src) return

    this.showVolume()

    const val = e.which === 38 ? 5 : -5

    if (this.state.volume + val < 0 || this.state.volume + val > 100) return

    this.setState(prevState => ({
      volume: prevState.volume + val
    }))
  }

  // Pause, skip forward / back
  keyboardShortcuts = e => {
    switch (e.which) {
      case 32:
        this.pauseAudio()
        break
      case 37:
        this.rewind()
        break
      case 39:
        this.fastforward()
        break
    }
  }

  // Keyup keyboard shortcuts
  handleOnKeyUp = e => {
    switch (e.which) {
      case 32:
      case 39:
      case 37:
        this.keyboardShortcuts(e)
        break
      case 38:
      case 40:
        this.setVolume(e)
        break
    }
  }

  // Fetch podcast data and set state
  fetchData = url => {
    this.setState(() => ({ isLoading: true, error: '', title: '' }))

    // Make GET request to Node service to parse RSS feed and send back JSON
    axios({
      method: 'GET',
      url: `https://xmlparse.glitch.me/?url=${url}`,
      timeout: 25 * 1000
    })
      .then(res => {
        // Pull out necessary podcast data
        const title = res.data.rss.channel.title._text
        const description =
          res.data.rss.channel.description._cdata ||
          res.data.rss.channel.description._text
        const img = res.data.rss.channel.image.url._text.replace(
          /http:\/\//,
          'https://'
        )
        const episodes = res.data.rss.channel.item.filter(e =>
          e.hasOwnProperty('enclosure')
        )

        // Set app state with podcast data
        this.setState(() => ({
          title,
          description,
          img,
          episodes,
          isLoading: false,
          error: ''
        }))
      })
      // Set error ir request timesout
      .catch(err => {
        if (err.code == 'ECONNABORTED') {
          this.setState(() => ({
            error: 'This is taking longer than expected :('
          }))
        }
      })
  }

  // Fetch podcast data on mount
  componentDidMount() {
    this.fetchData('https://feed.syntax.fm/rss')

    // Keyboard controls
    document.addEventListener('keyup', this.handleOnKeyUp, false)

    // Prevent spacebar scrolling
    document.addEventListener('keydown', e => {
      if (this.state.track.src.length < 1) return

      if (e.which == 32 || e.which == 38 || e.which == 40) {
        e.preventDefault()
        return false
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Sidebar
          fetchData={this.fetchData}
          changeTheme={this.changeTheme}
          theme={this.state.theme}
          currentTrack={this.state.title}
        />
        {this.state.error && (
          <div className='error'>
            <p>Uh-oh! {this.state.error}</p>
          </div>
        )}

        {this.state.isLoading ? (
          <Loader theme={this.state.theme} />
        ) : (
          <Fragment>
            {this.state.showVolume && (
              <Volume volume={this.state.volume} theme={this.state.theme} />
            )}

            <Header img={this.state.img} />
            <Episodes
              episodes={this.state.episodes}
              nowPlaying={this.state.track.title}
              setAudio={this.setAudio}
              theme={this.state.theme}
              title={this.state.title}
              description={this.state.description}
              img={this.state.img}
            />
          </Fragment>
        )}

        {this.state.track.src && (
          <Fragment>
            <SoundWrapper
              url={this.state.track.src}
              volume={this.state.volume}
              playStatus={this.state.playingStatus}
              playFromPosition={this.state.position}
              onPlaying={this.handleOnPlaying}
              onError={this.handleOnError}
              onFinishedPlaying={this.handleOnFinishedPlaying}
            />
            <Controls
              playingStatus={this.state.playingStatus}
              pauseAudio={this.pauseAudio}
              stopAudio={this.stopAudio}
              fastforward={this.fastforward}
              rewind={this.rewind}
              audio={this.state.track}
              time={convertSeconds(this.state.position / 1000)}
              position={this.state.position}
              duration={this.state.duration}
              volume={this.state.volume}
              theme={this.state.theme}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default App
