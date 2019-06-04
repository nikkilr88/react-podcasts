import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/ProgressBar.css'

class ProgressBar extends Component {
  render() {
    const { position, duration, theme } = this.props

    const styles = {
      width: (position * 100) / duration + '%'
    }

    return (
      <div className={`progress-wrapper ${theme}`}>
        <div style={styles} className='progress-bar' />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  position: state.player.position,
  duration: state.player.duration
})

export default connect(mapStateToProps)(ProgressBar)
