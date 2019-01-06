import React, { Component, Fragment } from 'react'

class Header extends Component {
  state = {
    showDescription: false
  }

  toggleDescription = () => {
    this.setState(() => ({ showDescription: !this.state.showDescription }))
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      let starting = 1
      let scrollPos = document.documentElement.scrollTop

      if (scrollPos > 200) return

      // Move background image up at a slower rate
      document.querySelector('.header-bg').style.backgroundPosition =
        '50% ' + (50 + scrollPos / 25 + '%')

      // Fade out text
      const descripton = document.querySelector('.description')
      const title = document.querySelector('.channel-title')

      if (title) {
        title.style.opacity = starting - scrollPos / 100
      }

      if (descripton) {
        descripton.style.opacity = starting - scrollPos / 100
      }
    })
  }

  render() {
    const { title, img, description } = this.props

    const styles = {
      background: `url(${img})`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%'
    }

    return (
      <Fragment>
        <header>
          <i className="material-icons info" onClick={this.toggleDescription}>
            info_outline
          </i>
          {this.state.showDescription && (
            <Fragment>
              <div className="description-wrapper header-bg" style={styles} />
              <div className="description">
                {description || <p>No description available</p>}
              </div>
            </Fragment>
          )}
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
