import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Data
import { podcasts } from '../data/podcasts'

// Components
import Loader from '../components/common/Loader.component'
import PodcastPageContent from '../components/podcast-page/PodcastPageContent.component'

// Actions
import { fetchPodcast, setLoading } from '../actions/podcast'

// Styles
import '../css/PodcastPage.styles.css'

const PodcastPage = ({
  match,
  history,
  error,
  loading,
  fetchPodcast,
  currentPodcast,
}) => {
  const loadPodcast = () => {
    const name = match.params.podcast.replace(/_/g, ' ')
    const podcast = podcasts.filter(podcast => podcast.name === name)

    if (currentPodcast === name) return

    if (podcast.length > 0) {
      const feedURL = podcast[0].link
      fetchPodcast(feedURL)
    } else {
      history.push('/404')
    }
  }

  useEffect(() => {
    loadPodcast()
  }, [])

  return (
    <Fragment>
      {/* TODO: Create error flash message */}
      {error && <p className="error">{error}</p>}

      {loading ? <Loader /> : <PodcastPageContent />}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  error: state.podcast.error,
  loading: state.podcast.loading,
  currentPodcast: state.podcast.podcast.title,
})

export default withRouter(
  connect(mapStateToProps, { fetchPodcast, setLoading })(PodcastPage)
)
