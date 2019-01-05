import React, { Component } from 'react'

class PodcastListElement extends Component {
  render() {
    const { title, date, audio, setAudio } = this.props

    return (
      <div className="infoBox">
        <div className="text">
          <p className="date">{date}</p>
          <h3>{title}</h3>
        </div>
        <button onClick={() => setAudio(audio, title)}>Play</button>
      </div>
    )
  }
}

export default PodcastListElement
