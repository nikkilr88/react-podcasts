import React, { Component } from 'react'
import moment from 'moment'

class PodcastListElement extends Component {
  render() {
    const { title, date, audio, setAudio } = this.props

    return (
      <div className="infoBox">
        <div className="text">
          <p className="date">{moment(date).format('LL')}</p>
          <h3>{title.length > 50 ? title.substring(0, 50) + '...' : title}</h3>
        </div>
        <button className="btn" onClick={() => setAudio(audio, title)}>
          <i className="material-icons">play_arrow</i>
        </button>
      </div>
    )
  }
}

export default PodcastListElement
