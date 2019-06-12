import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../css/ChannelInfo.css'

class ChannelInfo extends Component {
  render() {
    const { theme } = this.props
    const { img, title, description, website, author } = this.props.podcast

    return (
      <div className={`channel-info ${theme}`}>
        <img className={`channel-img ${theme}`} src={img} alt='podcast image' />
        <div className='channel-text'>
          <h1 className='title'>{title}</h1>
          <h3 className='channel-author'>{author}</h3>
          <p>{description || 'No Description Available :('}</p>
          <a href={website} target='_blank' className='channel-website'>
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
