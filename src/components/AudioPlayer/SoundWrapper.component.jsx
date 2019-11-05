import React, { Component } from 'react'
import Sound from 'react-sound'
import { connect } from 'react-redux'

// Actions
import {
  handlePlay,
  setLoading,
  handleFinishedPlaying
} from '../../actions/player'

class SoundWrapper extends Component {
  handleSetLoading = () => {
    this.props.setLoading(false)
  }

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
        onLoad={this.handleSetLoading}
        onResume={this.handleSetLoading}
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
  { handlePlay, handleFinishedPlaying, setLoading }
)(SoundWrapper)
