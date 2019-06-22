import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Sound from 'react-sound'
import ProgressBar from '../components/ProgressBar'
import ProgressiveImage from 'react-progressive-image'
import { podcasts } from '../data/podcasts-test'

import { pauseAudio, skip, stopAudio } from '../actions/player'

import '../css/NowPlaying.css'

class NowPlaying extends Component {
  render() {
    const { img, title, podcast } = this.props.player.track
    const { playStatus } = this.props.player

    let podcastImage = ''

    if (title) {
      podcastImage = podcasts
        .filter(p => p.name === podcast)[0]
        .img.replace(/100x100/g, '30x30')
    }

    return (
      <div>
        {title ? (
          <div className={`NowPlaying-player ${this.props.theme}`}>
            <i
              onClick={this.props.stopAudio}
              className='material-icons NowPlaying-close'
            >
              close
            </i>
            <ProgressiveImage src={img} placeholder={podcastImage}>
              {src => <img src={src} alt='podcast image' />}
            </ProgressiveImage>

            <div className='NowPlaying-info'>
              <ProgressBar
                width='75%'
                backgroundColor={
                  this.props.theme === 'light'
                    ? '#ccc'
                    : 'rgba(255,255,255,0.1)'
                }
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
                onClick={this.props.pauseAudio}
                className='material-icons play-btn'
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
          <p className='middle'>
            There is nothing playing. Go find something awesome!
          </p>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  player: state.player,
  theme: state.theme.theme
})

export default connect(
  mapStateToProps,
  { pauseAudio, skip, stopAudio }
)(NowPlaying)
