import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Logo from '../images/devcasts-logo-slant.png'
import SidebarImg from './SidebarImg'
import HamMenu from '../images/hamburger-menu.png'
import CloseIcon from '../images/close-icon.png'

import { fetchPodcast, setLoading } from '../actions/podcast'

import '../css/Sidebar.css'

class Sidebar extends Component {
  static defaultProps = {
    list: [
      {
        name: 'Syntax - Tasty Web Development Treats',
        link: 'https://feed.syntax.fm/rss',
        img:
          'https://is4-ssl.mzstatic.com/image/thumb/Music113/v4/60/4e/d6/604ed6ba-6a5a-5faa-edf5-189a290f3aa3/source/60x60bb.jpg'
      },
      {
        name: 'The freeCodeCamp Podcast',
        link: 'http://freecodecamp.libsyn.com/rss',
        img:
          'https://is3-ssl.mzstatic.com/image/thumb/Music123/v4/de/83/f9/de83f9d5-1745-8572-56d9-b10f62824807/source/60x60bb.jpg'
      },
      {
        name: 'Full Stack Radio',
        link: 'https://rss.simplecast.com/podcasts/279/rss',
        img:
          'https://is4-ssl.mzstatic.com/image/thumb/Music113/v4/91/8f/bc/918fbcc5-9e95-4a42-c8f4-50f2321fcc9d/source/60x60bb.jpg'
      },
      {
        name: 'La Vie en Code',
        link: 'http://lavieencode.libsyn.com/rss',
        img:
          'https://is4-ssl.mzstatic.com/image/thumb/Music113/v4/06/ea/e5/06eae525-675c-d89d-8b21-b36e3d779f42/source/60x60bb.jpg'
      },
      {
        name: 'Base.cs Podcast',
        link: 'http://feeds.codenewbie.org/basecs_podcast.xml',
        img:
          'https://is5-ssl.mzstatic.com/image/thumb/Music123/v4/11/79/e5/1179e5b5-3899-2c26-175f-d4ab664c5197/source/60x60bb.jpg'
      },
      {
        name: 'CodeNewbie',
        link: 'http://feeds.codenewbie.org/cnpodcast.xml',
        img:
          'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/64/02/75/640275f5-5c8e-27ba-352e-3e68449b1335/source/60x60bb.jpg'
      }
    ]
  }

  state = {
    showSidebar: false
  }

  handleOnClick = e => {
    // SET LOADING BROKEN
    this.props.setLoading()
    this.props.fetchPodcast(e.target.dataset.link)
  }

  toggleSidebar = e => {
    this.setState(prevState => ({
      showSidebar: !prevState.showSidebar
    }))
  }

  render() {
    console.log(this.props)
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
          className={`sidebar ${this.props.theme} ${this.state.showSidebar &&
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
            <div
              onClick={this.props.changeTheme}
              className={`change-theme ${this.props.theme}`}
            />
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

export default connect(
  null,
  { fetchPodcast, setLoading }
)(Sidebar)
