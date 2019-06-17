import React, { Component, Fragment } from 'react'
import { NavLink as Link } from 'react-router-dom'
import { connect } from 'react-redux'

import CloseIcon from '../images/close-icon.png'
import HamMenu from '../images/hamburger-menu.png'
import Logo from '../images/devcasts-logo-slant.png'

import { switchTheme } from '../actions/theme'

import '../css/Sidebar.css'

class Sidebar extends Component {
  state = {
    showSidebar: false
  }

  toggleSidebar = e => {
    this.setState(prevState => ({
      showSidebar: !prevState.showSidebar
    }))
  }

  render() {
    const { theme, switchTheme } = this.props

    return (
      <Fragment>
        <div
          className={`sidebar ${theme} ${this.state.showSidebar &&
            'sidebar-out'}`}
        >
          <ul>
            <li className='sidebar-top'>
              <Link to='/'>
                <img src={Logo} alt='dev casts logo' />
              </Link>
            </li>
            <li className='sidebar-link'>
              <Link to='/'>
                <i className='fas fa-home' /> Home
              </Link>
            </li>
            <li className='sidebar-link'>
              <Link to='/bookmarked'>
                <i className='fas fa-bookmark' /> Bookmarked
              </Link>
            </li>
            <li className='sidebar-link settings'>
              <Link to='/settings'>
                <i className='fas fa-cog' /> Settings
              </Link>
            </li>
          </ul>

          {/* <div className='theme-wrapper'>
            <h4>Theme</h4>
            <div onClick={switchTheme} className={`change-theme ${theme}`} />
          </div> */}
        </div>

        <div
          onClick={this.toggleSidebar}
          className={`toggle-side ${this.state.showSidebar && 'over'}`}
        >
          <img
            alt='menu icon'
            src={this.state.showSidebar ? CloseIcon : HamMenu}
          />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(
  mapStateToProps,
  { switchTheme }
)(Sidebar)
