import React, { Component } from 'react'
import Sound from 'react-sound'

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
    const {
      url,
      volume,
      playStatus,
      playFromPosition,
      onPlaying,
      onError,
      onFinishedPlaying
    } = this.props

    return (
      <Sound
        url={url}
        volume={volume}
        playStatus={playStatus}
        playFromPosition={playFromPosition}
        onPlaying={onPlaying}
        onError={onError}
        onFinishedPlaying={onFinishedPlaying}
      />
    )
  }
}
export default SoundWrapper
