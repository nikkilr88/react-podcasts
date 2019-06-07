import React, { Component } from 'react'
import ProgressBar from './ProgressBar'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import { pauseAudio, stopAudio, skip } from '../actions/player'
import { convertSeconds } from '../utils'

import '../css/Controls.css'

class Controls extends Component {
  // Pause, skip forward / back
  keyboardShortcuts = e => {
    switch (e.which) {
      case 32:
        this.props.pauseAudio()
        break
      case 37:
        this.props.skip(-10000)
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
        // this.setVolume(e)
        break
    }
  }

  handleOnKeyDown = e => {
    if (this.props.track.src.length < 1) return

    if (e.which == 32 || e.which == 38 || e.which == 40) {
      e.preventDefault()
      return false
    }
  }

  // Fetch podcast data on mount
  componentDidMount() {
    // Keyboard controls
    document.addEventListener('keyup', this.handleOnKeyUp, false)

    // Prevent spacebar scrolling
    document.addEventListener('keydown', this.handleOnKeyDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleOnKeyUp, false)
    document.removeEventListener('keydown', this.handleOnKeyDown, false)
  }

  render() {
    const {
      time,
      skip,
      theme,
      track,
      stopAudio,
      pauseAudio,
      playStatus
    } = this.props

    return (
      <div id='player' className={theme}>
        <div className='title'>
          {track.title.length > 50
            ? track.title.substring(0, 50) + '...'
            : track.title}
        </div>

        <ProgressBar theme={theme} />

        <div className='control-btns'>
          <span className='time'>{time}</span>
          <button onClick={() => skip(-10000)}>
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
    )
  }
}

const mapStateToProps = state => ({
  track: state.player.track,
  duration: state.player.duration,
  position: state.player.position,
  playStatus: state.player.playStatus,
  time: convertSeconds(state.player.position / 1000)
})

export default connect(
  mapStateToProps,
  { pauseAudio, stopAudio, skip }
)(Controls)
