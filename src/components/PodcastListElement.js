import React, { Component } from 'react'
import moment from 'moment'

import '../css/PodcastList.css'

class PodcastListElement extends Component {
  handleOnClick = e => {
    this.props.setAudio(this.props.audio, this.props.title)
    this.props.resetButtons(e)
  }

  render() {
    const { title, date } = this.props
    const isPlaying = this.props.title == this.props.nowPlaying

    return (
      <div className="infoBox">
        <div className="text">
          <p className="date">{moment(date).format('LL')}</p>
          <h3>{title.length > 50 ? title.substring(0, 50) + '...' : title}</h3>
        </div>
        <button
          className={isPlaying ? 'btn selected' : 'btn'}
          onClick={this.handleOnClick}
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
}

export default PodcastListElement
