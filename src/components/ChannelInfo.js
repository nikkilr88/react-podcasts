import React, { Component, Fragment } from 'react'
import ProgressiveImage from 'react-progressive-image'
import { connect } from 'react-redux'
import imgPlaceholder from '../images/image-placeholder.png'

import '../css/ChannelInfo.css'

class ChannelInfo extends Component {
  render() {
    const { theme } = this.props
    const { img, title, description, website, author } = this.props.podcast

    return (
      <div className={`ChannelInfo ${theme}`}>
        <ProgressiveImage src={img} placeholder={imgPlaceholder}>
          {src => (
            <img
              src={src}
              alt='podcast image'
              className={`ChannelInfo-img ${theme}`}
            />
          )}
        </ProgressiveImage>
        <div className='ChannelInfo-text'>
          <h1 className='ChannelInfo-title'>{title}</h1>
          <h3 className={`ChannelInfo-author ${theme}`}>{author}</h3>
          <p>{description || 'No Description Available :('}</p>
          <a href={website} target='_blank' className='ChannelInfo-website'>
            <i className='fas fa-external-link-alt' />
            Visit website
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
  podcast: state.podcast.podcast,
  nowPlaying: state.player.track.title
})

export default connect(mapStateToProps)(ChannelInfo)
