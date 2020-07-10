import React, { Component } from 'react'
import { connect } from 'react-redux'

// Styles
import '../../css/Volume.styles.css'

const Volume = ({ volume, theme }) => {
  const styles = {
    width: volume + '%',
  }
  return (
    <div className="volume-container">
      <h3>Volume</h3>
      <div className={`volume-wrapper ${theme}`}>
        <div style={styles} className="volume-bar" />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  volume: state.player.volume,
})

export default connect(mapStateToProps)(Volume)
