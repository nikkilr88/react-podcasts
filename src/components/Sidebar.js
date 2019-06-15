import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import SidebarImg from './SidebarImg'
import CloseIcon from '../images/close-icon.png'
import HamMenu from '../images/hamburger-menu.png'
import Logo from '../images/devcasts-logo-slant.png'

import { switchTheme } from '../actions/theme'
import { fetchPodcast, setLoading } from '../actions/podcast'

import '../css/Sidebar.css'

class Sidebar extends Component {
  state = {
    showSidebar: false
  }

  handleOnClick = e => {
    this.props.setLoading()
    this.props.fetchPodcast(e.target.dataset.link)
  }

  toggleSidebar = e => {
    this.setState(prevState => ({
      showSidebar: !prevState.showSidebar
    }))
  }

  render() {
    const { theme, switchTheme } = this.props
    const sidebarItems = this.props.list.map((e, i) => {
      return (
        <SidebarImg
          key={i}
          index={i}
          imgSrc={e.img}
          title={e.name}
          dataLink={e.link}
          handleOnClick={this.handleOnClick}
          className={i === 0 && 'sidebar-selected'}
        />
      )
    })

    return (
      <Fragment>
        <div
          className={`sidebar ${theme} ${this.state.showSidebar &&
            'sidebar-out'}`}
        >
          <ul>
            <li className='sidebar-top'>
              <img src={Logo} alt='dev casts logo' />
            </li>
            {sidebarItems}
          </ul>

          <div className='theme-wrapper'>
            <h4>Theme</h4>
            <div onClick={switchTheme} className={`change-theme ${theme}`} />
          </div>
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
  { fetchPodcast, setLoading, switchTheme }
)(Sidebar)
