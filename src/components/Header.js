import React, { Component, Fragment } from 'react'

class Header extends Component {
  componentDidMount() {
    document.addEventListener('scroll', () => {
      let starting = 1
      let scrollPos = document.documentElement.scrollTop

      if (scrollPos > 200) return

      // Move background image up at a slower rate
      document.querySelector('.header-bg').style.backgroundPosition =
        '50% ' + (50 + scrollPos / 25 + '%')

      // Fade out text
      document.querySelector('.channel-title').style.opacity =
        starting - scrollPos / 100
    })
  }
  render() {
    const { title, img } = this.props

    const styles = {
      background: `url(${img})`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%'
    }

    return (
      <Fragment>
        <header>
          <div className="bg-wrapper">
            <div style={styles} className="header-bg" />
          </div>
          <p className="channel-title">{title}</p>
        </header>
        <img className="channel-img" src={img} alt="podcast image" />
      </Fragment>
    )
  }
}

export default Header