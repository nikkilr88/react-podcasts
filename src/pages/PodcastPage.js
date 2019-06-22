import React, { Component, Fragment, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import PodcastInfo from '../components/PodcastInfo'
import { withRouter, Link } from 'react-router-dom'
import { fetchPodcast, setLoading } from '../actions/podcast'

import '../css/PodcastPage.css'

import { podcasts } from '../data/podcasts-test'

class PodcastPage extends Component {
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

        {loading ? <Loader /> : <PodcastInfo />}
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
  )(PodcastPage)
)
