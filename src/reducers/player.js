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

    case 'PAUSE_AUDIO':
      return {
        ...state,
        playStatus: action.paused
      }

    case 'HANDLE_ON_PLAY':
      return {
        ...state,
        position: action.payload.position,
        duration: action.payload.duration
      }

    case 'SKIP':
      return {
        ...state,
        position: action.position
      }

    default:
      return state
  }
}

export default playerReducer
