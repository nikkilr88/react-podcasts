import React, { Component, Fragment, Suspense, lazy } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPodcast, setLoading } from '../actions/podcast'

import Loader from './Loader'
import ChannelInfo from './ChannelInfo'
import EpisodeList from './EpisodeList'

import podcasts from '../data/podcasts'

class App extends Component {
  loadPodcast = () => {
    const title = this.props.match.params.podcast.replace(/_/g, ' ')
    const podcast = podcasts.filter(podcast => podcast.name === title)

    if (podcast.length > 0) {
      const feedURL = podcast[0].link

      this.props.setLoading()
      this.props.fetchPodcast(feedURL)
    } else {
      this.props.history.push('/404')
    }
  }

  componentDidMount() {
    this.loadPodcast()
  }

  componentDidUpdate(prevProps) {
    const prevURL = prevProps.match.url
    const currURL = this.props.match.url

    if (prevURL !== currURL) {
      this.loadPodcast()
    }
  }

  render() {
    const { error, loading, theme } = this.props

    return (
      <Fragment>
        {error && <p className='error'>{error}</p>}

        {loading ? (
          <Loader />
        ) : (
          <div className={`items ${theme}`}>
            <ChannelInfo />
            <EpisodeList />
          </div>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
  error: state.podcast.error,
  loading: state.podcast.loading
})

export default withRouter(
  connect(
    mapStateToProps,
    { fetchPodcast, setLoading }
  )(App)
)
