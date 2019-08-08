import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import { podcasts, categories } from '../data/podcasts'

import '../css/HomePage.styles.css'

class HomePage extends Component {
  state = {
    sort: 'grid'
  }

  setSort = val => {
    this.setState({
      sort: val
    })
  }

  displayGrid = () => {
    return podcasts.map(podcast => (
      <Link
        key={podcast.name}
        className='Home-podcast'
        to={`/podcast/${podcast.name.replace(/ /g, '_')}`}
      >
        <div>
          <ProgressiveImage
            src={podcast.img.replace(/100x100/g, '360x360')}
            placeholder={podcast.img.replace(/100x100/g, '30x30')}
          >
            {src => <img src={src} alt='podcast cover' />}
          </ProgressiveImage>

          <h3 className='Home-podcast-title'>
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
            className='Home-podcast'
            to={`/podcast/${podcast.name.replace(/ /g, '_')}`}
          >
            <div>
              <ProgressiveImage
                src={podcast.img.replace(/100x100/g, '360x360')}
                placeholder={podcast.img.replace(/100x100/g, '30x30')}
              >
                {src => <img src={src} alt='podcast cover' />}
              </ProgressiveImage>

              <h3 className='Home-podcast-title'>
                {podcast.name.length > 13
                  ? podcast.name.substring(0, 13) + '...'
                  : podcast.name}
              </h3>
            </div>
          </Link>
        ))
      return (
        <section key={category.category} className='Home-category'>
          <h2 className='Home-category-title'>{category.display}</h2>
          <div className='Home-podcasts'>{categoryPodcasts}</div>
        </section>
      )
    })
  }

  render() {
    const { sort } = this.state
    const { theme } = this.props

    return (
      <div className={`Home ${theme}`}>
        <div className='Home-banner'>
          <h1>Podcasts</h1>
          <div>
            <i
              className={`fas fa-list icon ${
                sort === 'category' ? 'active' : ''
              }`}
              onClick={() => this.setSort('category')}
            />
            <i
              className={`fas fa-th icon ${sort === 'grid' ? 'active' : ''}`}
              onClick={() => this.setSort('grid')}
            />
          </div>
        </div>
        {this.state.sort === 'grid' ? (
          <div className='grid'>{this.displayGrid()}</div>
        ) : (
          this.sortByCategory()
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(HomePage)
