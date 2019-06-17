import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { podcasts, categories } from '../data/podcasts-test'

import '../css/HomePage.css'

class HomePage extends Component {
  render() {
    const categorySections = categories.map(category => {
      const categoryPodcasts = podcasts
        .filter(podcast => podcast.category === category)
        .map(podcast => (
          <Link
            className='category-podcast'
            key={podcast.name}
            to={`/podcast/${podcast.name.replace(/ /g, '_')}`}
          >
            <div>
              <img src={podcast.img} alt={podcast.name} />
              <h3>{podcast.name}</h3>
            </div>
          </Link>
        ))
      return (
        <section key={category} className='podcast-category'>
          <h2>{category}</h2>
          <div className='category-podcasts'>{categoryPodcasts}</div>
        </section>
      )
    })
    return <div className='home-page'>{categorySections}</div>
  }
}

export default HomePage
