import React, { Component, Fragment } from 'react'

class Header extends Component {
  render() {
    const { title, img } = this.props

    const styles = {
      background: `url(${img})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
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
