import React, { Component } from 'react'
import ProgressBar from './ProgressBar'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import { pauseAudio, stopAudio } from '../actions/player'
import { convertSeconds } from '../utils'

import '../css/Controls.css'

class Controls extends Component {
  render() {
    const {
      time,
      theme,
      track,
      rewind,
      position,
      duration,
      stopAudio,
      playStatus,
      pauseAudio,
      fastforward
    } = this.props

    return (
      <div id='player' className={theme}>
        <div className='title'>
          {track.title.length > 50
            ? track.title.substring(0, 50) + '...'
            : track.title}
        </div>

        <ProgressBar position={position} duration={duration} theme={theme} />

        <div className='control-btns'>
          <span className='time'>{time}</span>
          <button onClick={rewind}>
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

          <button onClick={fastforward}>
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
  { pauseAudio, stopAudio }
)(Controls)
