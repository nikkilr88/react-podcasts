import React from 'react'
import { connect } from 'react-redux'

// Utils
import { convertSeconds } from '../../utils'

// Styles
import '../../css/ProgressBar.styles.css'

const ProgressBar = ({ position, duration, theme, width, wrapperPosition }) => {
  const styles = {
    width: (position * 100) / duration + '%',
  }

  return (
    <div className="Progress-wrapper">
      <p>{convertSeconds(position / 1000)}</p>
      <div className={`Progress-background ${theme}`}>
        <div style={styles} className="Progress-bar" />
      </div>
      <p>{convertSeconds(duration / 1000)}</p>
    </div>
  )
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
  position: state.player.position,
  duration: state.player.duration,
})

export default connect(mapStateToProps)(ProgressBar)
