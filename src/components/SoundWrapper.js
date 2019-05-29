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
      onError,
      onPlaying,
      playStatus,
      playFromPosition,
      onFinishedPlaying
    } = this.props

    return (
      <Sound
        url={url}
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
export default SoundWrapper
