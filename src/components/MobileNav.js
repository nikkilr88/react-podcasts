import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink as Link, withRouter } from 'react-router-dom'
import '../css/MobileNav.css'

class MobileNav extends Component {
  render() {
    const location = {
      '/': 'Home',
      '/nowplaying': 'Now Playing',
      '/bookmarked': 'Bookmarked',
      '/settings': 'Settings'
    }

    const { podcast = 'Loading...' } = this.props
    const { pathname } = this.props.location

    const formattedPodcastName =
      podcast.length > 15 ? podcast.substring(0, 15) + '...' : podcast

    return (
      <Fragment>
        <nav className='MobileNav-top'>
          <p className='MobileNav-title'>
            {location[pathname] || formattedPodcastName}
          </p>
          {pathname !== '/' && (
            <button
              className='MobileNav-back'
              onClick={() => this.props.history.goBack()}
            >
              <i className='fas fa-arrow-left' />
              Back
            </button>
          )}
        </nav>

        <nav className='MobileNav'>
          <Link to='/' exact activeClassName='active-nav-item'>
            <i className='fas fa-home' />
          </Link>
          <Link to='/nowplaying' activeClassName='active-nav-item'>
            <i className='fas fa-headphones-alt' />
          </Link>
          <Link to='/bookmarked' activeClassName='active-nav-item'>
            <i className='fas fa-bookmark' />
          </Link>
          <Link to='/settings' activeClassName='active-nav-item'>
            <i className='fas fa-cog' />
          </Link>
        </nav>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  podcast: state.podcast.podcast.title
})

export default withRouter(connect(mapStateToProps)(MobileNav))
