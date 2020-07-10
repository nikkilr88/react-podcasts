import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import ChannelInfo from './ChannelInfo.component'
import EpisodeList from './EpisodeList.component'

const PodcastInfo = ({ theme, podcast, podcast: { episodes } }) => {
  const episodeList = episodes.filter(episode => episode.enclosure)

  return (
    <div className={`PodcastPage ${theme}`}>
      <ChannelInfo podcast={podcast} theme={theme} />
      <EpisodeList episodeList={episodeList} theme={theme} />
    </div>
  )
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
  podcast: state.podcast.podcast,
})

export default connect(mapStateToProps)(PodcastInfo)
