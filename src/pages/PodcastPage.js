import React, { Component, Fragment, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

// Data
import { podcasts } from '../data/podcasts'

// Components
import Loader from '../components/Loader.component'
import PodcastInfo from '../components/PodcastPage/PodcastInfo.component'

// Actions
import { fetchPodcast, setLoading } from '../actions/podcast'

// Styles
import '../css/PodcastPage.styles.css'

class PodcastPage extends Component {
  loadPodcast = () => {
    const name = this.props.match.params.podcast.replace(/_/g, ' ')
    const podcast = podcasts.filter(podcast => podcast.name === name)

    if (podcast.length > 0) {
      const feedURL = podcast[0].link
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
    const { error, loading } = this.props

    return (
      <Fragment>
        {error && <p className="error">{error}</p>}

        {loading ? <Loader /> : <PodcastInfo />}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  error: state.podcast.error,
  loading: state.podcast.loading
})

export default withRouter(
  connect(
    mapStateToProps,
    { fetchPodcast, setLoading }
  )(PodcastPage)
)
