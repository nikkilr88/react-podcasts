import React, { Fragment, useContext } from 'react'
import { connect } from 'react-redux'
import { ThemeContext } from 'styled-components'

// Utils
import { convertSeconds } from '../../utils'

// Styles
import { StyledProgressBar } from './ProgressBar.styles'

const ProgressBar = ({ position, duration, loading, playStatus }) => {
  const currentTheme = useContext(ThemeContext)

  const styles = {
    width: (position * 100) / duration + '%',
  }

  const podcastLoading = playStatus === 'PLAYING' && loading

  return (
    <StyledProgressBar theme={currentTheme}>
      <div className="background">
        <div style={styles} className="bar" />
      </div>
      <div className="times">
        {podcastLoading ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <p>{convertSeconds(position / 1000)}</p>
            <p>- {convertSeconds(duration / 1000 - position / 1000)}</p>
          </Fragment>
        )}
      </div>
    </StyledProgressBar>
  )
}

const mapStateToProps = state => ({
  position: state.player.position,
  duration: state.player.duration,
  loading: state.player.loading,
  playStatus: state.player.playStatus,
})

export default connect(mapStateToProps)(ProgressBar)
