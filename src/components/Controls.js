import React, { Component } from 'react'
import ProgressBar from './ProgressBar'
import Sound from 'react-sound'

import '../css/Controls.css'

class Controls extends Component {
  render() {
    const {
      time,
      audio,
      theme,
      rewind,
      position,
      duration,
      stopAudio,
      pauseAudio,
      fastforward,
      playingStatus
    } = this.props

    return (
      <div id='player' className={theme}>
        <div className='title'>
          {audio.title.length > 50
            ? audio.title.substring(0, 50) + '...'
            : audio.title}
        </div>

        <ProgressBar position={position} duration={duration} theme={theme} />

        <div className='control-btns'>
          <span className='time'>{time}</span>
          <button onClick={rewind}>
            <i className='material-icons'>replay_5</i>
          </button>

          <button onClick={pauseAudio}>
            {playingStatus == Sound.status.PLAYING ? (
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

export default Controls
