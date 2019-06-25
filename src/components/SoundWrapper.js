import React, { Component } from 'react'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import { handlePlay, handleFinishedPlaying, setLoaded } from '../actions/player'

class SoundWrapper extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.position !== this.props.position ||
      nextProps.playStatus !== this.props.playStatus
    ) {
      return true
    }
    return false
  }

  render() {
    const {
      track,
      volume,
      onError,
      position,
      setLoaded,
      playStatus,
      handlePlay,
      handleFinishedPlaying
    } = this.props

    return (
      <Sound
        url={track}
        volume={volume}
        onError={onError}
        onPlaying={handlePlay}
        playStatus={playStatus}
        playFromPosition={position}
        onLoad={setLoaded}
        onFinishedPlaying={handleFinishedPlaying}
      />
    )
  }
}

const mapStateToProps = state => ({
  volume: state.player.volume,
  track: state.player.track.src,
  position: state.player.position,
  playStatus: state.player.playStatus
})

export default connect(
  mapStateToProps,
  { handlePlay, handleFinishedPlaying, setLoaded }
)(SoundWrapper)
