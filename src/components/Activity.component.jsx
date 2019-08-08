import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Activity.styles.css'

class Activity extends Component {
  render() {
    const { activity } = this.props

    const activityList = activity.map((podcast, i) => (
      <div key={i} className='Activity-item'>
        <img src={podcast.img} alt={`${podcast.podcast} cover`} />
        <div className='Activity-item-text'>
          <h4>
            {podcast.podcast.length > 20
              ? podcast.podcast.substring(0, 20) + '...'
              : podcast.podcast}
          </h4>
          <p>
            {podcast.episode.length > 20
              ? podcast.episode.substring(0, 20) + '...'
              : podcast.episode}
          </p>
        </div>
      </div>
    ))
    return (
      <div className='Activity'>
        <h2>Recent Activity</h2>
        {activity.length === 0 ? (
          <p>No recent activity to show</p>
        ) : (
          activityList
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activity: state.activity
})

export default connect(mapStateToProps)(Activity)
