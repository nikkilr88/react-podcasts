import React, { Fragment, useState } from 'react'

// Components
import EpisodeSummary from './EpisodeSummary.component'
import EpisodeListElement from './EpisodeListElement.component'

// Styles
import '../../css/EpisodeList.styles.css'

const EpisodeList = ({ theme, episodeList }) => {
  // State
  const [searchValue, setSearchValue] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [selectedEpisode, setSelectedEpisode] = useState(null)

  const toggleSearchbar = () => {
    setShowSearch(!showSearch)
  }

  const clearEpisode = () => {
    setSelectedEpisode(null)
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
      <div className="EpisodeList-titleWrapper">
        <p className={`EpisodeList-title ${theme}`}>
          <strong>Available Episodes</strong>
          <small> ({filteredEpisodeList.length})</small>
        </p>
        <button title="Toggle searchbar" onClick={toggleSearchbar}>
          <i className="fas fa-search"></i>
        </button>

        {showSearch && (
          <input
            autoFocus
            type="text"
            placeholder="Search podcast episodes"
            className="EpisodeList-search"
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
          />
        )}
      </div>

      <div className="EpisodeList-wrapper">{filteredEpisodeList}</div>
    </Fragment>
  )
}

export default EpisodeList
