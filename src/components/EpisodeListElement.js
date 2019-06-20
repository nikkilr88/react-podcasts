import React, { Component } from 'react'
import moment from 'moment'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAudio } from '../actions/player'

import '../css/PodcastList.css'

class EpisodeListElement extends Component {
  handleOnClick = e => {
    this.props.setAudio(
      this.props.audio,
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
      <div className={`infoBox ${theme}`} title={title}>
        <div className='text'>
          <p className='date'>
            {this.formatDate(date)}
            <span> &#8226; </span>
            {minutesLong} mins
          </p>
          <h3>{title.length > 50 ? title.substring(0, 50) + '...' : title}</h3>
        </div>
        <button
          disabled={isPlaying}
          className={isPlaying ? 'btn selected' : 'btn'}
          onClick={this.handleOnClick}
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
