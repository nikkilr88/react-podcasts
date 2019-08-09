import React, { Component, Fragment } from 'react'
import ChannelInfo from './ChannelInfo.component'
import EpisodeList from './EpisodeList.component'
import { connect } from 'react-redux'

class PodcastInfo extends Component {
  render() {
    const { theme } = this.props
    return (
      <div className={`PodcastPage ${theme}`}>
        <ChannelInfo />
        <EpisodeList />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.settings.theme
})

export default connect(mapStateToProps)(PodcastInfo)
