import Sound from 'react-sound'

const playerState = {
  track: {
    title: '',
    src: ''
  },
  position: 0,
  duration: 0,
  playStatus: Sound.status.PLAYING,
  volume: 75,
  showVolume: false
}

const playerReducer = (state = playerState, action) => {
  switch (action.type) {
    case 'SET_AUDIO':
      return {
        ...state,
        track: {
          title: action.player.track.title,
          src: action.player.track.src
        },
        position: action.player.position,
        playStatus: action.player.playStatus
      }
    case 'STOP_AUDIO':
      return {
        ...state,
        track: {
          title: '',
          src: ''
        }
      }
    default:
      return state
  }
}

export default playerReducer
