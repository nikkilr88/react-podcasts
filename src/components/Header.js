import React, { Component, Fragment } from 'react'
import '../css/Header.css'

class Header extends Component {
  render() {
    const { img } = this.props

    const styles = {
      background: `url(${img})`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%'
    }

    return (
      <header>
        <div className='bg-wrapper'>
          <div style={styles} className='header-bg' />
        </div>
      </header>
    )
  }
}

export default Header
