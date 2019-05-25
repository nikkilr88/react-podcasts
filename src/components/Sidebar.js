import React, { Component } from 'react'
import Logo from '../images/devcasts-logo-slant.png'
import SidebarImg from './SidebarImg'

import '../css/Sidebar.css'

class Sidebar extends Component {
  static defaultProps = {
    list: [
      {
        name: 'sytax.fm',
        link: 'https://feed.syntax.fm/rss',
        img:
          'https://is4-ssl.mzstatic.com/image/thumb/Music113/v4/60/4e/d6/604ed6ba-6a5a-5faa-edf5-189a290f3aa3/source/60x60bb.jpg'
      },
      {
        name: 'Free Code Camp',
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
        name: 'La Vie En Code',
        link: 'http://lavieencode.libsyn.com/rss',
        img:
          'https://is4-ssl.mzstatic.com/image/thumb/Music113/v4/06/ea/e5/06eae525-675c-d89d-8b21-b36e3d779f42/source/60x60bb.jpg'
      },
      {
        name: 'Base.cs',
        link: 'http://feeds.codenewbie.org/basecs_podcast.xml',
        img:
          'https://is5-ssl.mzstatic.com/image/thumb/Music123/v4/11/79/e5/1179e5b5-3899-2c26-175f-d4ab664c5197/source/60x60bb.jpg'
      },
      {
        name: 'Code Newbie',
        link: 'http://feeds.codenewbie.org/cnpodcast.xml',
        img:
          'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/64/02/75/640275f5-5c8e-27ba-352e-3e68449b1335/source/60x60bb.jpg'
      }
    ]
  }
  handleOnClick = e => {
    // Refactor to get rid of query selector
    const links = [...document.querySelectorAll('.sidebar li')]

    for (let link of links) {
      link.classList.remove('sidebar-selected')
    }
    e.target.classList.add('sidebar-selected')

    this.props.fetchData(e.target.dataset.link)
  }

  render() {
    const sidebarItems = this.props.list.map((e, i) => {
      return (
        <SidebarImg
          key={i}
          handleOnClick={this.handleOnClick}
          imgSrc={e.img}
          title={e.name}
          dataLink={e.link}
          index={i}
          className={i === 0 ? 'sidebar-selected' : ''}
        />
      )
    })

    return (
      <div className={`sidebar ${this.props.theme}`}>
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
    )
  }
}

export default Sidebar
