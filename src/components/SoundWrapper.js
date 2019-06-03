import React, { Component } from 'react'
import Sound from 'react-sound'
import { connect } from 'react-redux'

class SoundWrapper extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.playFromPosition !== this.props.playFromPosition ||
      nextProps.playStatus !== this.props.playStatus
    ) {
      return true
    }
    return false
  }
  render() {
    console.log(this.props)
    const {
      track,
      volume,
      onError,
      onPlaying,
      playStatus,
      playFromPosition,
      onFinishedPlaying
    } = this.props

    return (
      <Sound
        url={track}
        volume={volume}
        onError={onError}
        onPlaying={onPlaying}
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
  duration: state.player.duration,
  volume: state.player.volume,
  playStatus: state.player.playStatus
})

export default connect(mapStateToProps)(SoundWrapper)
