import React, { Component } from 'react'
import { connect } from 'react-redux'
import { podcasts, categories } from '../../data/podcasts'
import { switchDisplay } from '../../actions/settings'
import { displayGrid, sortByCategory } from './utils'

import '../../css/HomePage.styles.css'

class HomePage extends Component {
  render() {
    const { theme, display, switchDisplay } = this.props

    return (
      <div className={`Home ${theme}`}>
        <div className="Home-banner">
          <h1>Podcasts</h1>
          <div>
            <i
              className={`fas fa-list icon ${
                display === 'category' ? 'active' : ''
              }`}
              onClick={() => switchDisplay('category')}
            />
            <i
              className={`fas fa-th icon ${display === 'grid' ? 'active' : ''}`}
              onClick={() => switchDisplay('grid')}
            />
          </div>
        </div>
        {display === 'grid' ? (
          <div className="grid">{displayGrid(podcasts)}</div>
        ) : (
          sortByCategory(categories, podcasts)
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
  display: state.settings.display
})

export default connect(
  mapStateToProps,
  { switchDisplay }
)(HomePage)
