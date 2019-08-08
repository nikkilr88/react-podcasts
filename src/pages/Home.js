import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Activity from '../components/Activity.component'
import ProgressiveImage from 'react-progressive-image'
import { podcasts, categories } from '../data/podcasts'

import '../css/HomePage.styles.css'

class HomePage extends Component {
  render() {
    const { theme } = this.props

    const categorySections = categories.map(category => {
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
                src={podcast.img}
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
    return (
      <div className={`Home ${theme}`}>
        <div className='Home-grid'>
          <div className='Home-podcast-categories'>
            <div className='Home-banner'>
              <h1>Podcasts</h1>
            </div>
            {categorySections}
          </div>
          <Activity />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(HomePage)
