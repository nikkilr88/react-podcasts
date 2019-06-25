import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import EpisodeListElement from './EpisodeListElement'
import '../css/EpisodeList.css'

class EpisodeList extends Component {
  render() {
    const { theme } = this.props
    const { episodes } = this.props.podcast

    const episodeList = episodes.map((e, i) => (
      <EpisodeListElement
        key={i}
        theme={theme}
        title={e.title}
        trackId={e.guid}
        date={e.published}
        duration={e.duration}
        audio={e.enclosure.url}
      />
    ))

    return (
      <Fragment>
        <h1 className={`EpisodeList-title ${theme}`}>Available Episodes</h1>
        <div className='EpisodeList-wrapper'>{episodeList}</div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
  podcast: state.podcast.podcast
})

export default connect(mapStateToProps)(EpisodeList)
