import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { setAudio } from '../actions/player'
import { convertSeconds } from '../utils/index'

import '../css/PodcastList.css'

class EpisodeListElement extends Component {
  handleOnClick = e => {
    this.props.setAudio(this.props.audio, this.props.title)
    e.target.blur()
  }

  formatDuration = duration => {
    let formattedDuration

    if (duration.includes(':')) {
      formattedDuration = duration.length < 7 ? '00:' + duration : duration
    } else {
      const secToMin = convertSeconds(duration)
      formattedDuration = secToMin.length < 7 ? '00:' + secToMin : secToMin
    }

    return formattedDuration
  }

  formatDate = date => {
    const now = moment()
    const releaseDate = moment(date)

    return now.diff(releaseDate, 'days') > 14
      ? moment(date).format('LL')
      : moment(date).fromNow()
  }

  render() {
    const { title, date, duration, theme, nowPlaying } = this.props
    const isPlaying = title === nowPlaying

    const minutesLong = Math.round(
      moment.duration(this.formatDuration(duration)).asMinutes()
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
)(EpisodeListElement)
