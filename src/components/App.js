import React, { Component, Fragment, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { fetchPodcast } from '../actions/podcast'

import SoundWrapper from './SoundWrapper'
import Sound from 'react-sound'
import Controls from './Controls'
import Header from './Header'
import Loader from './Loader'
import Sidebar from './Sidebar'
import Volume from './Volume'
import EpisodeList from './EpisodeList'
import ChannelInfo from './ChannelInfo'

class App extends Component {
  state = {
    theme: 'light' // light or dark
  }

  changeTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }))
  }

  handleOnFinishedPlaying = () => {
    this.setState(() => ({
      position: 1,
      playingStatus: Sound.status.PAUSED
    }))
  }

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
        <Sidebar changeTheme={this.changeTheme} />

        {error && (
          <div className='error'>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <Header />
            <div className={`items ${theme}`}>
              <ChannelInfo />
              <EpisodeList />
            </div>
          </Fragment>
        )}

        {track.src && (
          <Fragment>
            <SoundWrapper
              onError={this.handleOnError}
              onFinishedPlaying={this.handleOnFinishedPlaying}
            />
            <Controls theme={this.state.theme} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  track: state.player.track,
  error: state.podcast.error,
  loading: state.podcast.loading,
  theme: state.theme.theme
})

export default connect(
  mapStateToProps,
  { fetchPodcast }
)(App)
