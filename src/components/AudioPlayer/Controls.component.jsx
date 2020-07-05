import React, { useRef, useEffect, Fragment } from 'react'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Components
import Volume from './Volume.component'
import ProgressBar from './ProgressBar.component'
import SoundWrapper from './SoundWrapper.component'

// Actions
import {
  skip,
  stopAudio,
  setVolume,
  hideVolume,
  showVolume,
  togglePlayPause,
} from '../../actions/player'

// Utils
import { convertSeconds } from '../../utils'

// Styles
import '../../css/Controls.styles.css'

const Controls = ({
  hideVolume,
  image,
  playStatus,
  podcast,
  setVolume,
  showVolume,
  skip,
  stopAudio,
  theme,
  time,
  togglePlayPause,
  track,
  volumeVisible,
}) => {
  // Pause, skip forward / back
  const keyboardShortcuts = event => {
    switch (event.key) {
      case ' ':
        togglePlayPause()
        break
      case 'ArrowLeft':
        skip(-5000)
        break
      case 'ArrowRight':
        skip(10000)
        break
    }
  }

  // Keyup keyboard shortcuts
  const handleOnKeyUp = event => {
    switch (event.key) {
      case ' ':
      case 'ArrowRight':
      case 'ArrowLeft':
        keyboardShortcuts(event)
        break
      case 'ArrowUp':
      case 'ArrowDown':
        onSetVolume(event)
        break
    }
  }

  const timerRef = useRef(null)

  const toggleVolumeVisibility = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setTimeout(hideVolume, 1000)

    showVolume()
  }

  const onSetVolume = event => {
    const val = event.key === 'ArrowUp' ? 5 : -5

    toggleVolumeVisibility()
    setVolume(val)
  }

  const handleOnKeyDown = event => {
    if ([' ', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault()
      return false
    }
  }

  const setMediaSession = () => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: podcast,
        album: 'Podcast',
        artwork: [
          {
            src: image,
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      })

      navigator.mediaSession.setActionHandler('seekbackward', () => {
        skip(-5000)
      })

      navigator.mediaSession.setActionHandler('seekforward', () => {
        skip(10000)
      })
    }
  }

  // Set Media session whenever track title changes
  useEffect(setMediaSession, [track.title])

  // Set up event listeners
  useEffect(() => {
    // Keyboard controls
    document.addEventListener('keyup', handleOnKeyUp, false)

    // Prevent spacebar scrolling
    document.addEventListener('keydown', handleOnKeyDown, false)

    return () => {
      document.removeEventListener('keyup', handleOnKeyUp, false)
      document.removeEventListener('keydown', handleOnKeyDown, false)
    }
  }, [])

  const podcastLink = `/podcast/${podcast.replace(/ /gi, '_')}`

  return track.title.length > 0 ? (
    <Fragment>
      <SoundWrapper />

      {volumeVisible && <Volume theme={theme} />}

      <div className={`Controls-player ${theme}`}>
        <Link to={podcastLink}>
          <img className="Controls-img" src={image} alt="podcast cover" />
        </Link>

        <div className="Controls-title">
          <strong className="Controls-title-track">
            {track.title.length > 20
              ? track.title.substring(0, 20) + '...'
              : track.title}
          </strong>
          <Link to={podcastLink} className="Controls-title-podcast">
            {podcast}
          </Link>
        </div>

        <ProgressBar />

        <div className="Controls-btns">
          <button onClick={() => skip(-5000)}>
            <i className="material-icons">replay_5</i>
          </button>

          <button onClick={togglePlayPause}>
            {playStatus == Sound.status.PLAYING ? (
              <i className="material-icons paused">pause</i>
            ) : (
              <i className="material-icons">play_arrow</i>
            )}
          </button>

          <button onClick={stopAudio}>
            <i className="material-icons">stop</i>
          </button>

          <button onClick={() => skip(10000)}>
            <i className="material-icons">forward_10</i>
          </button>
        </div>
      </div>
    </Fragment>
  ) : null
}

const mapStateToProps = ({ settings, player }) => ({
  theme: settings.theme,
  track: player.track,
  image: player.track.img,
  playStatus: player.playStatus,
  podcast: player.track.podcast,
  volumeVisible: player.showVolume,
  time: convertSeconds(player.position / 1000),
})

export default connect(mapStateToProps, {
  togglePlayPause,
  stopAudio,
  skip,
  showVolume,
  hideVolume,
  setVolume,
})(Controls)
