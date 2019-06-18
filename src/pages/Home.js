import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { podcasts, categories } from '../data/podcasts-test'

import '../css/HomePage.css'

class HomePage extends Component {
  render() {
    const categorySections = categories.map(category => {
      const categoryPodcasts = podcasts
        .filter(podcast => podcast.category === category.category)
        .map(podcast => (
          <Link
            className='category-podcast'
            key={podcast.name}
            to={`/podcast/${podcast.name.replace(/ /g, '_')}`}
          >
            <div>
              <img src={podcast.img} alt={podcast.name} />
              <h3>
                {podcast.name.length > 13
                  ? podcast.name.substring(0, 13) + '...'
                  : podcast.name}
              </h3>
            </div>
          </Link>
        ))
      return (
        <section key={category.category} className='podcast-category'>
          <h2>{category.display}</h2>
          <div className='category-podcasts'>{categoryPodcasts}</div>
        </section>
      )
    })
    return (
      <div className='home-page'>
        <div className='banner'>
          <h1>devCasts</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, atque. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Dicta, nostrum.
          </p>
        </div>
        {categorySections}
      </div>
    )
  }
}

export default HomePage
