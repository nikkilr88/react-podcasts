import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import { podcasts, categories } from '../data/podcasts'
import styled from 'styled-components/macro'
import { useSpring, animated } from 'react-spring'

// Styles
import '../css/HomePage.styles.css'

// Fade in on mount
const useFadeInOnMount = () => {
  const [mounted, setMounted] = useState(false)
  // set visible on mount, invisible on unmount
  useEffect(() => {
    setMounted(true)
    // TODO: transition if you want unmount animation?
    return () => setMounted(false)
  }, [])
  return useSpring({
    opacity: mounted ? 1 : 0,
  })
}

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
      </animated.div>
    </Link>
  ))
}

const PodcastCategories = ({ podcasts }) => {
  const springVisibleOnMount = useFadeInOnMount({ fromLeft: true })

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

const HomePage = ({ theme }) => {
  const [sort, setSort] = useState('grid')

  return (
    <div className={`Home ${theme}`}>
      <div className="Home-banner">
        <h1>Podcasts</h1>
        <div>
          <i
            className={`fas fa-list icon ${
              sort === 'category' ? 'active' : ''
            }`}
            onClick={() => setSort('category')}
          />
          <i
            className={`fas fa-th icon ${sort === 'grid' ? 'active' : ''}`}
            onClick={() => setSort('grid')}
          />
        </div>
      </div>
      {sort === 'grid' ? (
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
})

export default connect(mapStateToProps)(HomePage)
