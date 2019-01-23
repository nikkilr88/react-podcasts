import React, { Component } from 'react'
import PodcastListElement from './PodcastListElement'

import '../css/ChannelInfo.css'

class Episodes extends Component {
  render() {
    const {
      episodes,
      nowPlaying,
      setAudio,
      theme,
      title,
      description,
      img
    } = this.props

    const episodeList = episodes.map((e, i) => (
      <PodcastListElement
        key={i}
        date={e.pubDate._text}
        title={e.title._text}
        nowPlaying={nowPlaying}
        audio={e.enclosure._attributes.url}
        setAudio={setAudio}
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
            alt="podcast image"
          />
          <h1 className="title">{title}</h1>
          <p>{description || 'No Description Available :('}</p>
        </div>
        <h1 className={`episodes ${theme}`}>Episodes</h1>
        {episodeList}
      </div>
    )
  }
}

export default Episodes
