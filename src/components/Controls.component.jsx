import React, { Component, Fragment } from 'react'
import Volume from './Volume.component'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar.component'
import SoundWrapper from './SoundWrapper.component'
import { convertSeconds } from '../utils'
import {
  skip,
  setVolume,
  stopAudio,
  pauseAudio,
  showVolume,
  hideVolume
} from '../actions/player'

import '../css/Controls.styles.css'

class Controls extends Component {
  // Pause, skip forward / back
  keyboardShortcuts = e => {
    switch (e.which) {
      case 32:
        this.props.pauseAudio()
        break
      case 37:
        this.props.skip(-5000)
        break
      case 39:
        this.props.skip(10000)
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

  toggleVolume = () => {
    if (this.timeout) {
      clearInterval(this.timeout)
    }

    this.props.showVolume()

    this.timeout = setTimeout(() => {
      this.props.hideVolume()
    }, 1000)
  }

  setVolume = e => {
    const val = e.which === 38 ? 5 : -5

    this.toggleVolume()
    this.props.setVolume(val)
  }

  handleOnKeyDown = e => {
    if (this.props.track.src.length < 1) return

    if (e.which == 32 || e.which == 38 || e.which == 40) {
      e.preventDefault()
      return false
    }
  }

  setMediaSession = () => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.props.track.title,
        artist: this.props.podcast,
        album: 'Podcast',
        artwork: [
          {
            src: this.props.image,
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      })

      navigator.mediaSession.setActionHandler('seekbackward', () => {
        this.props.skip(-5000)
      })

      navigator.mediaSession.setActionHandler('seekforward', () => {
        this.props.skip(10000)
      })
    }
  }

  // Fetch podcast data on mount
  componentDidMount() {
    // Set media session for mobile notifications/lockscreen display
    this.setMediaSession()

    // Keyboard controls
    document.addEventListener('keyup', this.handleOnKeyUp, false)

    // Prevent spacebar scrolling
    document.addEventListener('keydown', this.handleOnKeyDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleOnKeyUp, false)
    document.removeEventListener('keydown', this.handleOnKeyDown, false)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.track.title !== this.props.track.title) {
      // Update media session when track changes
      this.setMediaSession()
    }
  }

  render() {
    const {
      time,
      skip,
      theme,
      image,
      track,
      podcast,
      stopAudio,
      pauseAudio,
      playStatus,
      volumeVisible
    } = this.props

    return track.title.length > 0 ? (
      <Fragment>
        <SoundWrapper />

        {volumeVisible && <Volume theme={theme} />}

        <div className={`Controls-player ${theme}`}>
          <ProgressBar wrapperPosition='absolute' />

          <Link to={`/podcast/${podcast.replace(/ /gi, '_')}`}>
            <img className='Controls-img' src={image} alt='podcast cover' />
          </Link>

          <div className='Controls-title'>
            {track.title.length > 50
              ? track.title.substring(0, 50) + '...'
              : track.title}
          </div>

          <div className='Controls-btns'>
            <span className='time'>{time}</span>
            <button onClick={() => skip(-5000)}>
              <i className='material-icons'>replay_5</i>
            </button>

            <button onClick={pauseAudio}>
              {playStatus == Sound.status.PLAYING ? (
                <i className='material-icons paused'>pause</i>
              ) : (
                <i className='material-icons'>play_arrow</i>
              )}
            </button>

            <button onClick={stopAudio}>
              <i className='material-icons'>stop</i>
            </button>

            <button onClick={() => skip(10000)}>
              <i className='material-icons'>forward_10</i>
            </button>
          </div>
        </div>
      </Fragment>
    ) : (
      ''
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
  track: state.player.track,
  image: state.player.track.img,
  playStatus: state.player.playStatus,
  podcast: state.player.track.podcast,
  volumeVisible: state.player.showVolume,
  time: convertSeconds(state.player.position / 1000)
})

export default connect(
  mapStateToProps,
  { pauseAudio, stopAudio, skip, showVolume, hideVolume, setVolume }
)(Controls)
