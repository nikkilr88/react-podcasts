import Sound from 'react-sound'

const playerState = {
  track: {
    id: '',
    src: '',
    title: '',
    podcast: '',
    img: ''
  },
  volume: 75,
  position: 0,
  duration: 0,
  showVolume: false,
  playStatus: Sound.status.PLAYING
}

const playerReducer = (state = playerState, action) => {
  switch (action.type) {
    case 'SET_AUDIO':
      return {
        ...state,
        track: {
          title: action.title,
          src: action.src,
          id: action.id,
          img: action.img,
          podcast: action.podcast
        },
        position: 0,
        playStatus: Sound.status.PLAYING
      }

    case 'STOP_AUDIO':
      return {
        ...state,
        track: {
          title: '',
          src: '',
          id: ''
        }
      }

    case 'PAUSE_AUDIO':
      return {
        ...state,
        playStatus: action.paused
      }

    case 'HANDLE_PLAY':
      return {
        ...state,
        position: action.payload.position,
        duration: action.payload.duration
      }

    case 'HANDLE_FINISHED_PLAYING':
      return {
        ...state,
        position: 1,
        playStatus: Sound.status.PAUSED
      }

    case 'SKIP':
      return {
        ...state,
        position: action.position
      }

    case 'SHOW_VOLUME':
      return {
        ...state,
        showVolume: true
      }

    case 'HIDE_VOLUME':
      return {
        ...state,
        showVolume: false
      }

    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.volume
      }

    default:
      return state
  }
}

export default playerReducer
