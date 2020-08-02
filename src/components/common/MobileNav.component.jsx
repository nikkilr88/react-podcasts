import React, { useContext, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink as Link, withRouter } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

// Styles
import { StyledMobileNavTop, StyledMobileNavBottom } from './MobileNav.styles'

const MobileNav = ({
  history,
  nowPlaying,
  podcast = 'Loading...',
  location: { pathname },
}) => {
  const currentTheme = useContext(ThemeContext)

  const location = {
    '/': 'Home',
    '/nowplaying': 'Now Playing',
    '/bookmarked': 'Bookmarked',
    '/settings': 'Settings',
  }
  const formattedPodcastName =
    podcast.length > 15 ? podcast.substring(0, 15) + '...' : podcast

  return (
    <Fragment>
      <StyledMobileNavTop theme={currentTheme}>
        <p className="MobileNav-title">
          {location[pathname] || formattedPodcastName}
        </p>
        {pathname !== '/' && (
          <button className="MobileNav-back" onClick={() => history.goBack()}>
            <i className="fas fa-arrow-left" />
            Back
          </button>
        )}
      </StyledMobileNavTop>

      <StyledMobileNavBottom>
        <Link to="/" exact activeClassName="active-nav-item">
          <i className="fas fa-home MobileNav-icon" />
        </Link>
        <Link
          to="/nowplaying"
          activeClassName="active-nav-item"
          className={nowPlaying && 'nowPlaying-active'}
        >
          <i className="fas fa-headphones-alt MobileNav-icon" />
        </Link>
        <Link to="/bookmarked" activeClassName="active-nav-item">
          <i className="fas fa-bookmark MobileNav-icon" />
        </Link>
        <Link to="/settings" activeClassName="active-nav-item">
          <i className="fas fa-cog MobileNav-icon" />
        </Link>
      </StyledMobileNavBottom>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  podcast: state.podcast.podcast.title,
  nowPlaying: state.player.track.title,
})

export default withRouter(connect(mapStateToProps)(MobileNav))
