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

export const stopAudio = () => dispatch => {
  dispatch({
    type: 'STOP_AUDIO'
  })
}
