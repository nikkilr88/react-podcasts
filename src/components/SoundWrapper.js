import React, { Component } from 'react'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import { handlePlay, handleFinishedPlaying } from '../actions/player'
import debounce from 'lodash.debounce'
import throttle from 'lodash.debounce'

class SoundWrapper extends Component {
  debouncePlay = debounce(
    data => {
      this.props.handlePlay(data)
    },
    1000,
    { maxWait: 1000 }
  )

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
        playStatus={playStatus}
        playFromPosition={position}
        onPlaying={this.debouncePlay}
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
  { handlePlay, handleFinishedPlaying }
)(SoundWrapper)
