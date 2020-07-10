import React, { Component } from 'react'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Data
import { podcasts } from '../data/podcasts'

// Components
import Loader from '../components/Loader.component'
import ProgressiveImage from 'react-progressive-image'
import ProgressBar from '../components/AudioPlayer/ProgressBar.component'
import { togglePlayPause, skip, stopAudio } from '../actions/player'

// Styles
import '../css/NowPlaying.styles.css'

const NowPlaying = ({
  skip,
  theme,
  stopAudio,
  togglePlayPause,
  player: {
    playStatus,
    loading,
    track: { img, title, podcast },
  },
}) => {
  const podcastLoading = playStatus === 'PLAYING' && loading

  const podcastImage = title
    ? podcasts
        .filter(p => p.name === podcast)[0]
        .img.replace(/100x100/g, '30x30')
    : undefined

  return title ? (
    <div className={`NowPlaying-player ${theme}`}>
      <i onClick={stopAudio} className="material-icons NowPlaying-close">
        close
      </i>

      <div className="NowPlaying-top">
        <div className="NowPlaying-img-wrapper">
          {podcastLoading && <Loader />}
          <ProgressiveImage src={img} placeholder={podcastImage}>
            {src => (
              <img
                src={src}
                alt="podcast image"
                className={podcastLoading ? 'blur' : undefined}
              />
            )}
          </ProgressiveImage>
        </div>

        <ProgressBar />
      </div>

      <div className="NowPlaying-info">
        <div className="NowPlaying-text">
          <h3>{title}</h3>
          <Link to={`/podcast/${podcast.replace(/ /g, '_')}`}>
            <h4>{podcast}</h4>
          </Link>
        </div>

        <div className="NowPlaying-controls">
          <i className="material-icons" onClick={() => skip(-5000)}>
            replay_5
          </i>
          <i onClick={togglePlayPause} className="material-icons play-btn">
            {playStatus === Sound.status.PAUSED
              ? 'play_circle_outline'
              : 'pause_circle_outline'}
          </i>
          <i className="material-icons" onClick={() => skip(10000)}>
            forward_10
          </i>
        </div>
      </div>
    </div>
  ) : (
    <p className="middle">
      There is nothing playing. Go find something awesome!
    </p>
  )
}

const mapStateToProps = state => ({
  player: state.player,
  theme: state.settings.theme,
})

export default connect(mapStateToProps, { togglePlayPause, skip, stopAudio })(
  NowPlaying
)
