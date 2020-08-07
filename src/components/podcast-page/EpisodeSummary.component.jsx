import React, { Fragment, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import moment from 'moment'

// Styles
import { StyledOverlay, StyledSummary } from './EpisodeSummary.styles'

const EpisodeSummary = ({ episode, clearEpisode }) => {
  const { date, title, description } = episode

  const currentTheme = useContext(ThemeContext)

  return (
    <Fragment>
      <StyledSummary theme={currentTheme}>
        <i className="close far fa-times-circle" onClick={clearEpisode} />
        <div className="scrollable">
          <div className="info">
            <small>{moment(date).format('MM-DD-YYYY')}</small>
            <h3>{title}</h3>
          </div>
          <p dangerouslySetInnerHTML={{ __html: `${description}` }} />
        </div>
      </StyledSummary>

      <StyledOverlay />
    </Fragment>
  )
}

export default EpisodeSummary
