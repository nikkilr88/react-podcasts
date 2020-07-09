import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import ChannelInfo from './ChannelInfo.component'
import EpisodeList from './EpisodeList.component'

class PodcastInfo extends Component {
  render() {
    const {
      theme,
      podcast,
      podcast: { episodes },
    } = this.props

    const episodeList = episodes.filter(episode => {
      return episode.enclosure
    })

    return (
      <div className={`PodcastPage ${theme}`}>
        <ChannelInfo podcast={podcast} theme={theme} />
        <EpisodeList episodeList={episodeList} theme={theme} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
  podcast: state.podcast.podcast,
})

export default connect(mapStateToProps)(PodcastInfo)
