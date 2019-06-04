import Sound from 'react-sound'

export const setAudio = (audio, title) => dispatch => {
  dispatch({
    type: 'SET_AUDIO',
    player: {
      track: {
        title: title,
        src: audio
      },
      position: 0,
      playStatus: Sound.status.PLAYING
    }
  })
}

export const handleOnPlaying = data => (dispatch, getState) => {
  const state = getState()

  if (state.player.playStatus === Sound.status.PLAYING) {
    dispatch({
      type: 'HANDLE_ON_PLAY',
      payload: data
    })
  }
}

export const pauseAudio = () => (dispatch, getState) => {
  const state = getState()
  const paused =
    state.player.playStatus === Sound.status.PLAYING
      ? Sound.status.PAUSED
      : Sound.status.PLAYING

  dispatch({
    type: 'PAUSE_AUDIO',
    paused
  })
}

export const stopAudio = () => dispatch => {
  dispatch({
    type: 'STOP_AUDIO'
  })
}

export const skip = value => (dispatch, getState) => {
  const state = getState()

  if (state.player.position > 0) {
    dispatch({
      type: 'SKIP',
      position: (state.player.position += value)
    })
  }
}
