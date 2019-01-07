import React, { Component } from 'react'
import moment from 'moment'

class PodcastListElement extends Component {
  handleOnClick = e => {
    this.props.setAudio(this.props.audio, this.props.title)

    const btns = document.querySelectorAll('.btn')
    for (let btn of btns) {
      btn.classList.remove('selected')
      btn.innerHTML = '<i class="material-icons">play_arrow</i>'
    }
    e.target.classList.add('selected')
    e.target.innerHTML = '<i class="material-icons">volume_up</i>'
  }
  render() {
    const { title, date } = this.props

    return (
      <div className="infoBox">
        <div className="text">
          <p className="date">{moment(date).format('LL')}</p>
          <h3>{title.length > 50 ? title.substring(0, 50) + '...' : title}</h3>
        </div>
        <button className="btn" onClick={this.handleOnClick}>
          <i className="material-icons">play_arrow</i>
        </button>
      </div>
    )
  }
}

export default PodcastListElement
