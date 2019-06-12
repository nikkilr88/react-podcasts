import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import EpisodeListElement from './EpisodeListElement'
import moment from 'moment'

class EpisodeList extends Component {
  render() {
    const { theme, nowPlaying } = this.props
    const { episodes } = this.props.podcast

    const episodeList = episodes
      .sort((a, b) => {
        let aDate = moment(a.pubDate._text).unix()
        let bDate = moment(b.pubDate._text).unix()

        return aDate < bDate ? 1 : aDate > bDate ? -1 : 0
      })
      .map((e, i) => (
        <EpisodeListElement
          key={i}
          theme={theme}
          date={e.pubDate._text}
          nowPlaying={nowPlaying}
          audio={e.enclosure._attributes.url}
          duration={e['itunes:duration']._text}
          title={e.title._text || e.title._cdata}
        />
      ))

    return (
      <Fragment>
        <h1 className={`episodes ${theme}`}>Available Episodes</h1>
        {episodeList}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
  podcast: state.podcast.podcast,
  nowPlaying: state.player.track.title
})

export default connect(mapStateToProps)(EpisodeList)
