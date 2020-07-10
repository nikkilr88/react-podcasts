import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// Components
import PodcastCategories from '../components/home-page/category-view.component'
import PodcastGrid from '../components/home-page/grid-view.component'

// Actions
import { switchDisplay } from '../actions/settings'

// Data
import { podcasts } from '../data/podcasts'

// Styles
import '../css/HomePage.styles.css'

const HomePage = ({ theme, display, switchDisplay }) => {
  return (
    <div className={`Home ${theme}`}>
      <div className="Home-podcastTitleBar">
        <strong>Podcasts</strong>
        <div>
          <button>
            <i
              className={`fas fa-list icon ${
                display === 'category' && 'active'
              }`}
              onClick={() => {
                switchDisplay('category')
              }}
            />
          </button>
          <button>
            {' '}
            <i
              className={`fas fa-th icon ${display === 'grid' && 'active'}`}
              onClick={() => {
                switchDisplay('grid')
              }}
            />
          </button>
        </div>
      </div>
      {display === 'grid' ? (
        <div className="grid">
          <PodcastGrid podcasts={podcasts} />
        </div>
      ) : (
        <PodcastCategories podcasts={podcasts} />
      )}
    </div>
  )
}

const mapStateToProps = ({ settings }) => ({
  theme: settings.theme,
  display: settings.display,
})

export default connect(mapStateToProps, { switchDisplay })(HomePage)
