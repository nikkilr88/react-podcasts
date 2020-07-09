import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import { useSpring, animated } from 'react-spring/web.cjs'

// Actions
import { switchDisplay } from '../actions/settings'

// Data
import { podcasts, categories } from '../data/podcasts'

// Styles
import '../css/HomePage.styles.css'

// !: FADE IN HOOK
const useFadeInOnMount = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return useSpring({
    opacity: mounted ? 1 : 0,
  })
}

// !: PODCAST GRID VIEW
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
          {src => <img src={src} alt={`${podcast.name} podcast image`} />}
        </ProgressiveImage>

        <p className="Home-podcast-title">{podcast.name}</p>
      </animated.div>
    </Link>
  ))
}

// !: PODCAST CATEGORY VIEW
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

// !: HOMEPAGE COMPONENT
const HomePage = ({ theme, display, switchDisplay }) => {
  return (
    <div className={`Home ${theme}`}>
      <div className="Home-podcastTitleBar">
        <strong>Podcasts</strong>
        <div>
          <button>
            <i
              className={`fas fa-list icon ${
                display === 'category' ? 'active' : ''
              }`}
              onClick={() => {
                switchDisplay('category')
              }}
            />
          </button>
          <button>
            {' '}
            <i
              className={`fas fa-th icon ${display === 'grid' ? 'active' : ''}`}
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
