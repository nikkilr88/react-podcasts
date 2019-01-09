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
    return (
      <Sound
        url={this.props.url}
        playStatus={this.props.playStatus}
        playFromPosition={this.props.playFromPosition}
        onPlaying={this.props.onPlaying}
      />
    )
  }
}
export default SoundWrapper
