import React from 'react'
import { Link } from 'react-router-dom'
import { animated } from 'react-spring/web.cjs'

// Helpers
import { useFadeInOnMount, handleImageError } from './helpers'

// Images
import ProgressiveImage from 'react-progressive-image'

const PodcastGrid = ({ podcasts }) => {
  const springVisibleOnMount = useFadeInOnMount()

  return podcasts.map(podcast => (
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
}

export default PodcastGrid
