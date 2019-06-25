import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/ProgressBar.css'

class ProgressBar extends Component {
  render() {
    const { position, duration, theme, width, wrapperPosition } = this.props

    const styles = {
      width: (position * 100) / duration + '%'
    }

    const wrapperStyles = {
      width: width,
      position: wrapperPosition
    }

    return (
      <div className={`progress-wrapper ${theme}`} style={wrapperStyles}>
        <div style={styles} className='progress-bar' />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
  position: state.player.position,
  duration: state.player.duration
})

export default connect(mapStateToProps)(ProgressBar)
