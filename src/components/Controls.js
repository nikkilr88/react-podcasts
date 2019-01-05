import React, { Component } from 'react'

class Controls extends Component {
  render() {
    const { pauseAudio, audio, getAudioTime } = this.props

    return (
      <div id="player">
        <div id="title">{audio.title}</div>
        <span>{audio.time}</span>
        <div>
          <button>
            <i className="material-icons">replay_5</i>
          </button>

          <button onClick={pauseAudio}>
            <i className="material-icons paused">pause</i>
          </button>

          <button>
            <i className="material-icons">forward_10</i>
          </button>
        </div>
      </div>
    )
  }
}

export default Controls
