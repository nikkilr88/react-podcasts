import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { setAudio } from '../actions/player'
import { withRouter } from 'react-router-dom'

import '../css/EpisodeListElement.css'

class EpisodeListElement extends Component {
  handleOnClick = e => {
    this.props.setAudio(
      this.props.audio.replace(/http:\/\//, 'https://'),
      this.props.title,
      this.props.trackId,
      this.props.podcastImage,
      this.props.podcast
    )

    if (window.innerWidth <= 600) {
      this.props.history.push('/nowplaying')
    }
    e.target.blur()
  }

  formatDate = date => {
    const now = moment()
    const releaseDate = moment(date)

    return now.diff(releaseDate, 'days') > 14
      ? moment(date).format('LL')
      : moment(date).fromNow()
  }

  render() {
    const { trackId, title, date, duration, theme, nowPlayingId } = this.props
    const isPlaying = trackId === nowPlayingId

    const minutesLong = Math.round(
      moment.duration(duration, 'seconds').asMinutes()
    )

    return (
      <div className={`EpisodeListElement ${theme}`} title={title}>
        <div className='EpisodeListElement-text'>
          <p className='EpisodeListElement-date'>
            {this.formatDate(date)}
            <span> &#8226; </span>
            {minutesLong} mins
          </p>
          <h3 className='EpisodeListElement-title'>
            {title.length > 50 ? title.substring(0, 50) + '...' : title}
          </h3>
        </div>
        <button
          disabled={isPlaying}
          onClick={this.handleOnClick}
          className={`EpisodeListElement-play ${theme} ${isPlaying &&
            'selected'}`}
        >
          {isPlaying ? (
            <i className='material-icons'>volume_up</i>
          ) : (
            <i className='material-icons'>play_arrow</i>
          )}
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  nowPlayingId: state.player.track.id,
  podcastImage: state.podcast.podcast.img,
  podcast: state.podcast.podcast.title
})

export default withRouter(
  connect(
    mapStateToProps,
    { setAudio }
  )(EpisodeListElement)
)
