import React, { useState } from 'react'
import Sound from 'react-sound'
import { connect } from 'react-redux'

// Actions
import {
  handlePlay,
  setLoading,
  handleFinishedPlaying,
} from '../../actions/player'

const SoundWrapper = ({
  track,
  volume,
  onError,
  position,
  playStatus,
  handlePlay,
  handleFinishedPlaying,
  setLoading,
}) => {
  const [playbackRate, setPlaybackRate] = useState(1)

  const handleSetLoading = () => {
    setLoading(false)
  }

  return (
    <Sound
      url={track}
      volume={volume}
      onError={onError}
      onPlaying={handlePlay}
      playStatus={playStatus}
      onLoad={handleSetLoading}
      playFromPosition={position}
      onResume={handleSetLoading}
      onFinishedPlaying={handleFinishedPlaying}
      playbackRate={playbackRate}
    />
  )
}

const mapStateToProps = ({ player }) => ({
  volume: player.volume,
  track: player.track.src,
  position: player.position,
  playStatus: player.playStatus,
})

// shouldComponentNOTUpdate
const areEqual = (prevProps, nextProps) => {
  if (
    prevProps.position !== nextProps.position ||
    prevProps.playStatus !== nextProps.playStatus
  ) {
    return false
  }
  return true
}

const SoundWrapperConnected = connect(mapStateToProps, {
  handlePlay,
  handleFinishedPlaying,
  setLoading,
})(React.memo(SoundWrapper, areEqual))

export default SoundWrapperConnected
