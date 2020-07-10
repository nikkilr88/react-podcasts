import React from 'react'
import { Link } from 'react-router-dom'
import { animated } from 'react-spring/web.cjs'

// Helpers
import { useFadeInOnMount, handleImageError } from './helpers'

// Images
import ProgressiveImage from 'react-progressive-image'

// Data
import { categories } from '../../data/podcasts'

const PodcastCategories = ({ podcasts }) => {
  const springVisibleOnMount = useFadeInOnMount()

  return categories.map(podCategory => {
    const podcastsInCategory = podcasts
      .filter(({ category }) => category === podCategory.category)
      .map(podcast => (
        <Link
          key={podcast.name}
          className="Home-podcast"
          to={`/podcast/${podcast.name.replace(/ /g, '_')}`}
        >
          <animated.div style={springVisibleOnMount}>
            <ProgressiveImage
              onError={handleImageError}
              src={podcast.img.replace(/100x100/g, '360x360')}
              placeholder={podcast.img.replace(/100x100/g, '30x30')}
            >
              {src => (
                <img
                  src={src ? src : Fallback}
                  alt={`${podcast.name} podcast image`}
                />
              )}
            </ProgressiveImage>

            <p className="Home-podcast-title">{podcast.name}</p>
          </animated.div>
        </Link>
      ))
    return (
      <animated.section
        style={springVisibleOnMount}
        key={podCategory.category}
        className="Home-category"
      >
        <h2 className="Home-category-title">{podCategory.display}</h2>
        <div className="Home-podcasts">{podcastsInCategory}</div>
      </animated.section>
    )
  })
}

export default PodcastCategories
