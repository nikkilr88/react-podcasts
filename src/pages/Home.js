import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import { podcasts, categories } from '../data/podcasts'
import { switchDisplay } from '../actions/settings'

import '../css/HomePage.styles.css'

class HomePage extends Component {
  displayGrid = () => {
    return podcasts.map(podcast => (
      <Link
        key={podcast.name}
        className="Home-podcast"
        to={`/podcast/${podcast.name.replace(/ /g, '_')}`}
      >
        <div>
          <ProgressiveImage
            src={podcast.img.replace(/100x100/g, '360x360')}
            placeholder={podcast.img.replace(/100x100/g, '30x30')}
          >
            {src => <img src={src} alt="podcast cover" />}
          </ProgressiveImage>

          <h3 className="Home-podcast-title">
            {podcast.name.length > 13
              ? podcast.name.substring(0, 13) + '...'
              : podcast.name}
          </h3>
        </div>
      </Link>
    ))
  }

  sortByCategory = () => {
    return categories.map(category => {
      const categoryPodcasts = podcasts
        .filter(podcast => podcast.category === category.category)
        .map(podcast => (
          <Link
            key={podcast.name}
            className="Home-podcast"
            to={`/podcast/${podcast.name.replace(/ /g, '_')}`}
          >
            <div>
              <ProgressiveImage
                src={podcast.img.replace(/100x100/g, '360x360')}
                placeholder={podcast.img.replace(/100x100/g, '30x30')}
              >
                {src => <img src={src} alt="podcast cover" />}
              </ProgressiveImage>

              <h3 className="Home-podcast-title">
                {podcast.name.length > 13
                  ? podcast.name.substring(0, 13) + '...'
                  : podcast.name}
              </h3>
            </div>
          </Link>
        ))
      return (
        <section key={category.category} className="Home-category">
          <h2 className="Home-category-title">{category.display}</h2>
          <p className="Home-category-subtitle">{category.subtitle}</p>
          <div className="Home-podcasts">{categoryPodcasts}</div>
        </section>
      )
    })
  }

  render() {
    const { theme, display, switchDisplay } = this.props

    return (
      <div className={`Home ${theme}`}>
        <div className="Home-banner">
          <h1>Podcasts</h1>
          <div>
            <i
              className={`fas fa-list icon ${
                display === 'category' ? 'active' : ''
              }`}
              onClick={() => switchDisplay('category')}
            />
            <i
              className={`fas fa-th icon ${display === 'grid' ? 'active' : ''}`}
              onClick={() => switchDisplay('grid')}
            />
          </div>
        </div>
        {display === 'grid' ? (
          <div className="grid">{this.displayGrid()}</div>
        ) : (
          this.sortByCategory()
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
  display: state.settings.display
})

export default connect(
  mapStateToProps,
  { switchDisplay }
)(HomePage)
