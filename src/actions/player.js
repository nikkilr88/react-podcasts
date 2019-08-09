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

export const setLoading = value => dispatch => {
  dispatch({
    type: 'SET_PLAYER_LOADING',
    loading: value
  })
}

export const setAudio = (audio, title, id, img, podcast) => dispatch => {
  dispatch({
    type: 'SET_AUDIO',
    title: title,
    src: audio,
    id: id,
    img: img,
    podcast: podcast
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

export const togglePlayPause = () => (dispatch, getState) => {
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
  const newVolume = prevVolume + value
  console.log('⚡🚨: newVolume', newVolume)

  if (newVolume < 0 || newVolume > 100) return

  dispatch({
    type: 'SET_VOLUME',
    volume: newVolume
  })
}
