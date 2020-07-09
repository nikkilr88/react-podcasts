import React, { Fragment } from 'react'
import { connect } from 'react-redux'

// Utils
import { convertSeconds } from '../../utils'

// Styles
import '../../css/ProgressBar.styles.css'

const ProgressBar = ({ position, duration, theme, loading, playStatus }) => {
  const styles = {
    width: (position * 100) / duration + '%',
  }

  const podcastLoading = playStatus === 'PLAYING' && loading

  console.log(podcastLoading, playStatus, loading)

  return (
    <div className="Progress-wrapper">
      <div className={`Progress-background ${theme}`}>
        <div style={styles} className="Progress-bar" />
      </div>
      <div className="Progress-times">
        {podcastLoading ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <p>{convertSeconds(position / 1000)}</p>
            <p>- {convertSeconds(duration / 1000 - position / 1000)}</p>
          </Fragment>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
  position: state.player.position,
  duration: state.player.duration,
  loading: state.player.loading,
  playStatus: state.player.playStatus,
})

export default connect(mapStateToProps)(ProgressBar)
