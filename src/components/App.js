import React, { Component, Fragment, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { fetchPodcast } from '../actions/podcast'

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
    track: { title: '', src: '' },
    position: 0,
    duration: 0,
    playingStatus: Sound.status.PLAYING,
    volume: 75,
    showVolume: false,
    theme: 'light' // light or dark
  }

  // Toggle between light and dark theme
  changeTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light'
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

  // Fetch podcast data on mount
  componentDidMount() {
    this.props.fetchPodcast('https://feed.syntax.fm/rss')

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
        <Sidebar theme={this.state.theme} changeTheme={this.changeTheme} />
        {this.props.error && (
          <div className='error'>
            <p>{this.props.error}</p>
          </div>
        )}

        {this.props.loading ? (
          <Loader theme={this.state.theme} />
        ) : (
          <Fragment>
            {this.state.showVolume && (
              <Volume volume={this.state.volume} theme={this.state.theme} />
            )}

            <Header />
            <Episodes
              theme={this.state.theme}
              nowPlaying={this.state.track.title}
            />
          </Fragment>
        )}

        {this.props.track.src && (
          <Fragment>
            <SoundWrapper
              volume={this.state.volume}
              onError={this.handleOnError}
              onPlaying={this.handleOnPlaying}
              playFromPosition={this.state.position}
              onFinishedPlaying={this.handleOnFinishedPlaying}
            />
            <Controls
              rewind={this.rewind}
              theme={this.state.theme}
              volume={this.state.volume}
              pauseAudio={this.pauseAudio}
              fastforward={this.fastforward}
              position={this.state.position}
              duration={this.state.duration}
              playingStatus={this.state.playingStatus}
              time={convertSeconds(this.state.position / 1000)}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.podcast.loading,
  error: state.podcast.error,
  track: state.player.track
})

export default connect(
  mapStateToProps,
  { fetchPodcast }
)(App)
