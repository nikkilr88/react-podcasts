import React, { useState } from 'react'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import {
  handlePlay,
  setLoading,
  handleFinishedPlaying
} from '../actions/player'

const SoundWrapper = ({
  track,
  volume,
  onError,
  position,
  playStatus,
  handlePlay,
  handleFinishedPlaying,
  setLoading
}) => {
  const handleSetLoading = () => {
    setLoading(false)
  }

  // TODO:
  const [playbackRate /* , setPlaybackRate */] = useState(1)
  // between 0.5 and 4
  // hotkeys D and S for fast and slow

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
      // TODO: this doesn't work??? BUT WHY
      // {...{
      //   volume,
      //   onError,
      //   playStatus,
      //   url: track,
      //   onLoad: handleSetLoading,
      //   onResume: handleSetLoading,
      //   playFromPosition: position,
      //   onPlaying: handleSetLoading,
      //   onFinishedPlaying: handleFinishedPlaying
      // }}
    />
  )
}

const mapStateToProps = ({ player }) => ({
  volume: player.volume,
  track: player.track.src,
  position: player.position,
  playStatus: player.playStatus
})

// shouldComponentNOTUpdate
const areEqual = (prevProps, nextProps) => {
  console.log('⚡🚨: areEqual -> prevProps.playStatus', prevProps.playStatus)
  console.log('⚡🚨: areEqual -> prevProps.position', prevProps.position)
  if (
    prevProps.position !== nextProps.position ||
    prevProps.playStatus !== nextProps.playStatus
  ) {
    return false
  }
  return true
}

const SoundWrapperConnected = connect(
  mapStateToProps,
  { handlePlay, handleFinishedPlaying, setLoading }
)(React.memo(SoundWrapper, areEqual))

export default SoundWrapperConnected
