import React, { Component } from 'react'
import Logo from '../images/devcasts-logo-slant.png'
import '../css/Sidebar.css'

class Sidebar extends Component {
  state = {
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
          'http://static.libsyn.com/p/assets/2/f/f/7/2ff7cc8aa33fe438/freecodecamp-square-logo-large-1400.jpg'
      },
      {
        name: 'Developer Tea',
        link: 'https://rss.simplecast.com/podcasts/363/rss',
        img:
          'https://media.simplecast.com/podcast/image/363/1471485029-artwork.jpg'
      },
      {
        name: 'La Vie En Code',
        link: 'http://lavieencode.libsyn.com/rss',
        img:
          'http://static.libsyn.com/p/assets/f/2/0/9/f2097918a8e6b61c/lvec-podcast-itunes-logo-3000.png'
      },
      {
        name: 'Base.cs',
        link: 'http://feeds.codenewbie.org/basecs_podcast.xml',
        img:
          'http://s3.amazonaws.com/codenewbie-assets/basecs-podcast/basecs+podcast+cover+7.png'
      },
      {
        name: 'Code Newbie',
        link: 'http://feeds.codenewbie.org/cnpodcast.xml',
        img:
          'http://s3.amazonaws.com/codenewbie-assets/podcasts/codenewbie_podcast_cover_art_gradient.png'
      }
    ]
  }
  handleOnClick = e => {
    const links = [...document.querySelectorAll('.sidebar li')]

    for (let link of links) {
      link.classList.remove('sidebar-selected')
    }
    e.target.classList.add('sidebar-selected')

    this.props.fetchData(e.target.dataset.link)
  }

  render() {
    const list = this.state.list.map((e, i) => {
      return (
        <li
          onClick={this.handleOnClick}
          title={e.name}
          data-link={e.link}
          key={i}
          className={i === 0 ? 'sidebar-selected' : ''}
        >
          <img className="img-link" src={e.img} alt="podcast icon" />
        </li>
      )
    })

    return (
      <ul className="sidebar">
        <li className="sidebar-top">
          <img src={Logo} alt="dev casts logo" />
        </li>
        {list}
      </ul>
    )
  }
}

export default Sidebar
