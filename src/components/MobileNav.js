import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import HamMenu from '../images/hamburger-menu.png'
import '../css/MobileNav.css'

class MobileNav extends Component {
  render() {
    return (
      <nav className='mobile-nav '>
        <Link to='/'>
          <i className='fas fa-home' />
        </Link>
        <Link to='/nowplaying'>
          <i className='fas fa-headphones-alt' />
        </Link>
        <Link to='/bookmarked'>
          <i className='fas fa-bookmark' />
        </Link>
        <Link to='/settings'>
          <i className='fas fa-cog' />
        </Link>
      </nav>
    )
  }
}

export default MobileNav
