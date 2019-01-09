import React, { Component, Fragment } from 'react'
import '../css/Header.css'

class Header extends Component {
  parallax = () => {
    let starting = 1
    let scrollPos = document.documentElement.scrollTop

    if (scrollPos > 150 || window.innerWidth < 950) return
    // Move background image up at a slower rate
    const header = document.querySelector('.header-bg')
    header.style.backgroundPosition = '50% ' + (50 + scrollPos / 25 + '%')

    // Fade out text
    // const descripton = document.querySelector('.description')
    // const title = document.querySelector('.channel-title')

    // title.style.opacity = starting - scrollPos / 100
    // descripton.style.opacity = starting - scrollPos / 100
  }
  componentDidMount() {
    document.addEventListener('scroll', this.parallax, true)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.parallax, true)
  }

  render() {
    const { img } = this.props

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
        </header>
      </Fragment>
    )
  }
}

export default Header
