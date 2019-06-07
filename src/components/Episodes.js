import React, { Component } from 'react'
import { connect } from 'react-redux'
import PodcastListElement from './PodcastListElement'

import '../css/ChannelInfo.css'

class Episodes extends Component {
  render() {
    const { theme, setAudio, nowPlaying } = this.props
    const { img, title, episodes, description, website } = this.props.podcast

    const episodeList = episodes.map((e, i) => (
      <PodcastListElement
        key={i}
        date={e.pubDate._text}
        title={e.title._text}
        nowPlaying={nowPlaying}
        audio={e.enclosure._attributes.url}
        theme={theme}
        duration={e['itunes:duration']._text}
      />
    ))

    return (
      <div className={`items ${theme}`}>
        <div className={`channel-info ${theme}`}>
          <img
            className={`channel-img ${theme}`}
            src={img}
            alt='podcast image'
          />
          <h1 className='title'>{title}</h1>
          <p>{description || 'No Description Available :('}</p>
          <p className='channel-website'>
            <i className='fas fa-external-link-alt' />
            <a href={website} target='_blank'>
              {' '}
              Visit website
            </a>
          </p>
        </div>
        <h1 className={`episodes ${theme}`}>Episodes</h1>
        {episodeList}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  podcast: state.podcast.podcast
})

export default connect(mapStateToProps)(Episodes)
