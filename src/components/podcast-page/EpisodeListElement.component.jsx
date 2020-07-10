import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Actions
import { setAudio } from '../../actions/player'

// Styles
import '../../css/EpisodeListElement.styles.css'

const EpisodeListElement = ({
  theme,
  podcast,
  history,
  setAudio,
  setEpisode,
  nowPlayingId,
  podcastImage,

  episode: {
    title,
    duration,
    description,
    guid: trackId,
    published: date,
    enclosure: { url: audio },
  },
}) => {
  const isPlaying = trackId === nowPlayingId

  const minutesLong = Math.round(
    moment.duration(duration, 'seconds').asMinutes()
  )

  const handleOnClick = event => {
    playAudio()

    if (window.innerWidth <= 900) {
      history.push('/nowplaying')
    }
    event.target.blur()
  }

  const handleSetEpisode = () => {
    setEpisode({
      date,
      title,
      description,
    })
  }

  const playAudio = () => {
    setAudio(
      audio.replace(/http:\/\//, 'https://'),
      title,
      trackId,
      podcastImage,
      podcast
    )
  }

  const formatDate = date => {
    const now = moment()
    const releaseDate = moment(date)

    return now.diff(releaseDate, 'days') > 14
      ? moment(date).format('LL')
      : moment(date).fromNow()
  }

  return (
    <div className={`EpisodeListElement ${theme}`} title={title}>
      <div className="EpisodeListElement-text" onClick={handleSetEpisode}>
        <p className="EpisodeListElement-date">
          {formatDate(date)}
          <span> &#8226; </span>
          {minutesLong} mins
        </p>
        <h3 className="EpisodeListElement-title">
          {title.length > 50 ? title.substring(0, 50) + '...' : title}
        </h3>
      </div>
      <button
        disabled={isPlaying}
        onClick={handleOnClick}
        className={`EpisodeListElement-play ${theme} ${
          isPlaying && 'selected'
        }`}
      >
        {isPlaying ? (
          <i className="material-icons">volume_up</i>
        ) : (
          <i className="material-icons">play_arrow</i>
        )}
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  nowPlayingId: state.player.track.id,
  podcastImage: state.podcast.podcast.img,
  podcast: state.podcast.podcast.title,
})

export default withRouter(
  connect(mapStateToProps, { setAudio })(EpisodeListElement)
)
