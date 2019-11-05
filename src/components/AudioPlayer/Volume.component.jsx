import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../css/Volume.styles.css'

class Volume extends Component {
  render() {
    const styles = {
      width: this.props.volume + '%'
    }
    return (
      <div className="volume-container">
        <h3>Volume</h3>
        <div className={`volume-wrapper ${this.props.theme}`}>
          <div style={styles} className="volume-bar" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  volume: state.player.volume
})

export default connect(mapStateToProps)(Volume)
