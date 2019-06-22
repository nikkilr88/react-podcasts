import React, { Component } from 'react'
import ProgressiveImage from 'react-progressive-image'
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
            className='Home-podcast'
            key={podcast.name}
            to={`/podcast/${podcast.name.replace(/ /g, '_')}`}
          >
            <div>
              <ProgressiveImage
                src={podcast.img}
                placeholder={podcast.img.replace(/100x100/g, '30x30')}
              >
                {src => <img src={src} alt='podcast image' />}
              </ProgressiveImage>

              <h3>
                {podcast.name.length > 13
                  ? podcast.name.substring(0, 13) + '...'
                  : podcast.name}
              </h3>
            </div>
          </Link>
        ))
      return (
        <section key={category.category} className='Home-category'>
          <h2>{category.display}</h2>
          <div className='Home-podcasts'>{categoryPodcasts}</div>
        </section>
      )
    })
    return (
      <div className='Home'>
        <div className='Home-banner'>
          <h1>devCasts</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
            molestiae eius ducimus illo quia odio magnam accusantium pariatur ad
            autem.
          </p>
        </div>
        {categorySections}
      </div>
    )
  }
}

export default HomePage
