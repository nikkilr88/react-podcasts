import React, { Component, Suspense } from 'react'
import Logo from '../images/devcasts-logo-slant.png'
import '../css/Sidebar.css'

const SidebarImg = React.lazy(() => import('./SidebarImg'))

class Sidebar extends Component {
  static defaultProps = {
    list: [
      {
        name: 'sytax.fm',
        link: 'https://feed.syntax.fm/rss',
        img:
          'https://ssl-static.libsyn.com/p/assets/7/9/0/7/790703531a3c8eca/iTunes_Artwork.png'
      },
      {
        name: 'Free Code Camp',
        link: 'http://freecodecamp.libsyn.com/rss',
        img:
          'https://static.libsyn.com/p/assets/2/f/f/7/2ff7cc8aa33fe438/freecodecamp-square-logo-large-1400.jpg'
      },
      {
        name: 'Full Stack Radio',
        link: 'https://rss.simplecast.com/podcasts/279/rss',
        img:
          'https://media.simplecast.com/podcast/image/279/1413649662-artwork.jpg'
      },
      {
        name: 'La Vie En Code',
        link: 'http://lavieencode.libsyn.com/rss',
        img:
          'https://static.libsyn.com/p/assets/f/2/0/9/f2097918a8e6b61c/lvec-podcast-itunes-logo-3000.png'
      },
      {
        name: 'Base.cs',
        link: 'http://feeds.codenewbie.org/basecs_podcast.xml',
        img:
          'https://s3.amazonaws.com/codenewbie-assets/basecs-podcast/basecs+podcast+cover+7.png'
      },
      {
        name: 'Code Newbie',
        link: 'http://feeds.codenewbie.org/cnpodcast.xml',
        img:
          'https://s3.amazonaws.com/codenewbie-assets/podcasts/codenewbie_podcast_cover_art_gradient.png'
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
        <Suspense key={i} fallback={<div className='img-link placeholder' />}>
          <SidebarImg
            onClick={this.handleOnClick}
            imgSrc={e.img}
            title={e.name}
            dataLink={e.link}
            index={i}
            className={i === 0 ? 'sidebar-selected' : ''}
          />
        </Suspense>
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
