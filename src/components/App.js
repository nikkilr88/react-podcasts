import React, { Component, Fragment, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { fetchPodcast } from '../actions/podcast'

import Loader from './Loader'
import Sidebar from './Sidebar'
import Controls from './Controls'
import ChannelInfo from './ChannelInfo'
import EpisodeList from './EpisodeList'
import SoundWrapper from './SoundWrapper'

class App extends Component {
  handleOnError = err => {
    console.log(err)
  }

  componentDidMount() {
    this.props.fetchPodcast('https://feed.syntax.fm/rss')
  }

  render() {
    const { error, loading, track, theme } = this.props

    return (
      <Fragment>
        <Sidebar />

        {error && <p className='error'>{error}</p>}

        {loading ? (
          <Loader />
        ) : (
          <div className={`items ${theme}`}>
            <ChannelInfo />
            <EpisodeList />
          </div>
        )}

        {track.src && (
          <Fragment>
            <SoundWrapper onError={this.handleOnError} />
            <Controls />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
  track: state.player.track,
  error: state.podcast.error,
  loading: state.podcast.loading
})

export default connect(
  mapStateToProps,
  { fetchPodcast }
)(App)
