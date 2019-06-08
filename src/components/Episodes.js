import React, { Component } from 'react'
import { connect } from 'react-redux'
import PodcastListElement from './PodcastListElement'
import moment from 'moment'

import '../css/ChannelInfo.css'

class Episodes extends Component {
  render() {
    const { theme, nowPlaying } = this.props
    const { img, title, episodes, description, website } = this.props.podcast

    const episodeList = episodes
      .sort((a, b) => {
        let aDate = moment(a.pubDate._text).unix()
        let bDate = moment(b.pubDate._text).unix()

        return aDate < bDate ? 1 : aDate > bDate ? -1 : 0
      })
      .map((e, i) => (
        <PodcastListElement
          key={i}
          theme={theme}
          date={e.pubDate._text}
          nowPlaying={nowPlaying}
          audio={e.enclosure._attributes.url}
          duration={e['itunes:duration']._text}
          title={e.title._text || e.title._cdata}
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
  podcast: state.podcast.podcast,
  nowPlaying: state.player.track.title
})

export default connect(mapStateToProps)(Episodes)
