import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import EpisodeSummary from './EpisodeSummary.component'
import EpisodeListElement from './EpisodeListElement.component'

import '../css/EpisodeList.styles.css'

class EpisodeList extends Component {
  state = {
    episode: null
  }

  setEpisode = (date, title, description) => {
    this.setState({
      episode: {
        date,
        title,
        description
      }
    })
  }

  clearEpisode = () => {
    this.setState({
      episode: null
    })
  }

  render() {
    const { theme } = this.props
    const { episodes } = this.props.podcast

    const episodeList = episodes.map((e, i) => (
      <EpisodeListElement
        key={e.guid}
        theme={theme}
        title={e.title}
        trackId={e.guid}
        date={e.published}
        duration={e.duration}
        audio={e.enclosure.url}
        description={e.description}
        setEpisode={this.setEpisode}
      />
    ))

    return (
      <Fragment>
        {this.state.episode && (
          <EpisodeSummary
            episode={this.state.episode}
            clearEpisode={this.clearEpisode}
          />
        )}
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
