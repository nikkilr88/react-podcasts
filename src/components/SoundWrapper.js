import React, { Component } from 'react'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import { handleOnPlaying } from '../actions/player'

class SoundWrapper extends Component {
  render() {
    const {
      track,
      volume,
      onError,
      playStatus,
      handleOnPlaying,
      playFromPosition,
      onFinishedPlaying
    } = this.props

    return (
      <Sound
        url={track}
        volume={volume}
        onError={onError}
        onPlaying={handleOnPlaying}
        playStatus={playStatus}
        playFromPosition={playFromPosition}
        onFinishedPlaying={onFinishedPlaying}
      />
    )
  }
}

const mapStateToProps = state => ({
  track: state.player.track.src,
  position: state.player.position,
  // volume: state.player.volume,
  playStatus: state.player.playStatus
})

export default connect(
  mapStateToProps,
  { handleOnPlaying }
)(SoundWrapper)
