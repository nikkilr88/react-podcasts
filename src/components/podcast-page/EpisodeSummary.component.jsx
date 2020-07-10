import React, { Fragment } from 'react'
import moment from 'moment'

// Styles
import '../../css/EpisodeSummary.styles.css'

const EpisodeSummary = ({ episode, clearEpisode }) => {
  const { date, title, description } = episode

  return (
    <Fragment>
      <div className="EpisodeSummary">
        <i className="close far fa-times-circle" onClick={clearEpisode} />
        <div className="scrollable">
          <div className="EpisodeSummary-info">
            <small>{moment(date).format('MM-DD-YYYY')}</small>
            <h3>{title}</h3>
          </div>
          <p dangerouslySetInnerHTML={{ __html: `${description}` }} />
        </div>
      </div>

      <div className="overlay" />
    </Fragment>
  )
}

export default EpisodeSummary
