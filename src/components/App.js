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
import Episodes from './Episodes'

class App extends Component {
  state = {
    volume: 75,
    showVolume: false,
    theme: 'light' // light or dark
  }

  // Toggle between light and dark theme
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

  showVolume = () => {
    if (this.timeout) {
      clearInterval(this.timeout)
    }

    this.setState(() => ({ showVolume: true }))

    this.timeout = setTimeout(() => {
      this.setState(() => ({ showVolume: false }))
    }, 1000)
  }

  // Set volume
  setVolume = e => {
    if (!this.props.track.src) return

    console.log(this.state.volume)

    this.showVolume()

    const val = e.which === 38 ? 5 : -5

    if (this.state.volume + val < 0 || this.state.volume + val > 100) return

    this.setState(prevState => ({
      volume: prevState.volume + val
    }))
  }

  // Fetch podcast data on mount
  componentDidMount() {
    this.props.fetchPodcast('https://feed.syntax.fm/rss')
  }

  render() {
    return (
      <Fragment>
        <Sidebar theme={this.state.theme} changeTheme={this.changeTheme} />
        {this.props.error && (
          <div className='error'>
            <p>{this.props.error}</p>
          </div>
        )}

        {this.props.loading ? (
          <Loader theme={this.state.theme} />
        ) : (
          <Fragment>
            {this.state.showVolume && (
              <Volume volume={this.state.volume} theme={this.state.theme} />
            )}

            <Header />
            <Episodes
              theme={this.state.theme}
              nowPlaying={this.props.track.title}
            />
          </Fragment>
        )}

        {this.props.track.src && (
          <Fragment>
            <SoundWrapper
              volume={this.state.volume}
              onError={this.handleOnError}
              onFinishedPlaying={this.handleOnFinishedPlaying}
            />
            <Controls theme={this.state.theme} volume={this.state.volume} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  track: state.player.track,
  error: state.podcast.error,
  loading: state.podcast.loading
})

export default connect(
  mapStateToProps,
  { fetchPodcast }
)(App)
