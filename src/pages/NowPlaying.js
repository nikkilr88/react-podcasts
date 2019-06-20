import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Sound from 'react-sound'
import ProgressBar from '../components/ProgressBar'

import { pauseAudio, skip } from '../actions/player'

import '../css/NowPlaying.css'

class NowPlaying extends Component {
  render() {
    const { img, title, podcast } = this.props.player.track
    const { playStatus } = this.props.player

    return (
      <div>
        {title ? (
          <div className='NowPlaying-player'>
            <img src={img} alt='' />

            <div className='NowPlaying-info'>
              <ProgressBar
                width='75%'
                backgroundColor='#ccc'
                wrapperPosition='relative'
              />
              <Link to={`/podcast/${podcast.replace(/ /g, '_')}`}>
                <h4>{podcast}</h4>
              </Link>
              <h3>{title}</h3>
            </div>

            <div className='NowPlaying-controls'>
              <i
                className='material-icons'
                onClick={() => this.props.skip(-5000)}
              >
                replay_5
              </i>
              <i
                className='material-icons play-btn'
                onClick={this.props.pauseAudio}
              >
                {playStatus === Sound.status.PAUSED
                  ? 'play_circle_outline'
                  : 'pause_circle_outline'}
              </i>
              <i
                className='material-icons'
                onClick={() => this.props.skip(10000)}
              >
                forward_10
              </i>
            </div>
          </div>
        ) : (
          <h1>There is nothing playing</h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  player: state.player
})

export default connect(
  mapStateToProps,
  { pauseAudio, skip }
)(NowPlaying)
