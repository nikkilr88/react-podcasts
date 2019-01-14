import React, { Component } from 'react'
import '../css/Volume.css'

class Volume extends Component {
  render() {
    const styles = {
      width: this.props.volume + '%'
    }
    return (
      <div className="volume-container">
        <h3>Volume</h3>
        <div className="volume-wrapper">
          <div style={styles} className="volume-bar" />
        </div>
      </div>
    )
  }
}

export default Volume
