import React, { Component } from 'react'
import '../css/ProgressBar.css'

class ProgressBar extends Component {
  render() {
    const { position, duration, theme } = this.props
    const styles = {
      width: (position * 100) / duration + '%'
    }
    return (
      <div className={`progress-wrapper ${theme}`}>
        <div style={styles} className="progress-bar" />
      </div>
    )
  }
}

export default ProgressBar
