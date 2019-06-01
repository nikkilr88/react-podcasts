import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../css/Header.css'

class Header extends Component {
  render() {
    const { img } = this.props

    const styles = {
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover !important',
      backgroundPosition: '50%'
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

const mapStateToProps = state => ({
  img: state.podcast.podcast.img
})

export default connect(mapStateToProps)(Header)
