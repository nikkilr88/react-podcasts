import React, { Component, Fragment } from 'react'
import ChannelInfo from './ChannelInfo'
import EpisodeList from './EpisodeList'
import { connect } from 'react-redux'
import '../css/PodcastPage.css'

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
  theme: state.theme.theme
})

export default connect(mapStateToProps)(PodcastInfo)
