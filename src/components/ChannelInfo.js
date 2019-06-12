import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../css/ChannelInfo.css'

class ChannelInfo extends Component {
  render() {
    const { theme } = this.props
    const { img, title, description, website } = this.props.podcast

    return (
      <div className={`channel-info ${theme}`}>
        <img className={`channel-img ${theme}`} src={img} alt='podcast image' />
        <h1 className='title'>{title}</h1>
        <p>{description || 'No Description Available :('}</p>
        <p className='channel-website'>
          <i className='fas fa-external-link-alt' />
          <a href={website} target='_blank'>
            Visit website
          </a>
        </p>
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
