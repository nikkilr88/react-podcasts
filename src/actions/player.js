import Sound from 'react-sound'

export const showVolume = () => dispatch => {
  dispatch({
    type: 'SHOW_VOLUME'
  })
}

export const hideVolume = () => dispatch => {
  dispatch({
    type: 'HIDE_VOLUME'
  })
}

export const handleFinishedPlaying = () => dispatch => {
  dispatch({
    type: 'HANDLE_FINISHED_PLAYING'
  })
}

export const stopAudio = () => dispatch => {
  dispatch({
    type: 'STOP_AUDIO'
  })
}

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

export const handlePlay = data => (dispatch, getState) => {
  const state = getState()

  if (state.player.playStatus === Sound.status.PLAYING) {
    dispatch({
      type: 'HANDLE_PLAY',
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

export const skip = value => (dispatch, getState) => {
  const state = getState()

  if (state.player.position > 0) {
    dispatch({
      type: 'SKIP',
      position: (state.player.position += value)
    })
  }
}

export const setVolume = value => (dispatch, getState) => {
  const state = getState()
  const prevVolume = state.player.volume

  if (state.player.volume + value < 0 || state.player.volume + value > 100)
    return

  dispatch({
    type: 'SET_VOLUME',
    volume: prevVolume + value
  })
}
