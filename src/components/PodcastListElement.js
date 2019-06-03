import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { setAudio } from '../actions/player'

import '../css/PodcastList.css'

class PodcastListElement extends Component {
  handleOnClick = e => {
    this.props.setAudio(this.props.audio, this.props.title)
    e.target.blur()
  }

  render() {
    const { title, date, duration, theme, nowPlaying } = this.props
    const isPlaying = title === nowPlaying

    const now = moment()
    const releaseDate = moment(date)

    const formattedDate =
      now.diff(releaseDate, 'days') > 14
        ? moment(date).format('LL')
        : moment(date).fromNow()

    const formattedDuration = duration.length < 8 ? '00:' + duration : duration
    const minutesLong = Math.round(
      moment.duration(formattedDuration).asMinutes()
    )

    return (
      <div className={`infoBox ${theme}`} title={title}>
        <div className='text'>
          <p className='date'>
            {formattedDate}
            <span> &#8226; </span>
            {minutesLong} mins
          </p>
          <h3>{title.length > 50 ? title.substring(0, 50) + '...' : title}</h3>
        </div>
        <button
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

export default connect(
  null,
  { setAudio }
)(PodcastListElement)
