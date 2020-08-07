import React from 'react'
import { connect } from 'react-redux'

// Styles
import { StyledVolume } from './Volume.styles'

const Volume = ({ volume }) => {
  const styles = {
    width: volume + '%',
  }
  return (
    <StyledVolume>
      <h3>Volume</h3>
      <div className="wrapper">
        <div style={styles} className="bar" />
      </div>
    </StyledVolume>
  )
}

const mapStateToProps = state => ({
  volume: state.player.volume,
})

export default connect(mapStateToProps)(Volume)
