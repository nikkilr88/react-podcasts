import React, { useState, useContext, Fragment } from 'react'
import { ThemeContext } from 'styled-components'

// Components
import EpisodeSummary from './EpisodeSummary.component'
import EpisodeListElement from './EpisodeListElement.component'

// Styles
import { StyledSearch, StyledTitleWrapper } from './EpisodeList.styles'

const EpisodeList = ({ theme, episodeList }) => {
  // State
  const [searchValue, setSearchValue] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [selectedEpisode, setSelectedEpisode] = useState(null)

  const currentTheme = useContext(ThemeContext)

  const toggleSearchbar = () => {
    setShowSearch(!showSearch)
  }

  const clearEpisode = () => {
    setSelectedEpisode(null)
  }

  const handleSearchInputChange = event => {
    setSearchValue(event.target.value)
  }

  const filteredEpisodeList = episodeList
    .filter(episode => {
      const searchValueLowerCase = searchValue.toLowerCase().trim()
      const episodeTitle = episode.title.toLowerCase()
      const episodeDescription = episode.description.toLowerCase()

      return (
        episodeTitle.includes(searchValueLowerCase) ||
        episodeDescription.includes(searchValueLowerCase)
      )
    })
    .map(episode => (
      <EpisodeListElement
        key={episode.guid}
        theme={theme}
        episode={episode}
        setEpisode={setSelectedEpisode}
      />
    ))

  return (
    <Fragment>
      {selectedEpisode && (
        <EpisodeSummary episode={selectedEpisode} clearEpisode={clearEpisode} />
      )}
      <StyledTitleWrapper theme={currentTheme}>
        <p className="title">
          <strong>Available Episodes</strong>
          <small> ({filteredEpisodeList.length})</small>
        </p>
        <button title="Toggle searchbar" onClick={toggleSearchbar}>
          <i className="fas fa-search"></i>
        </button>

        {showSearch && (
          <StyledSearch
            autoFocus
            type="text"
            placeholder="Search podcast episodes"
            className="search"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        )}
      </StyledTitleWrapper>

      <div>{filteredEpisodeList}</div>
    </Fragment>
  )
}

export default EpisodeList
