import React, { Component } from 'react'
import { connect } from 'react-redux'

// Data
import { podcasts, categories } from '../../data/podcasts'

// Utils
import { displayGrid, sortByCategory } from './utils'

// Actions
import { switchDisplay } from '../../actions/settings'

// Styles
import '../../css/HomePage.styles.css'

class HomePage extends Component {
  render() {
    const { theme, display, switchDisplay } = this.props

    return (
      <div className={`Home ${theme}`}>
        <h1>
          Listen to a podcast. <br /> Level up your coding skills.
        </h1>
        <div>
          <strong>Podcast</strong>
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
  display: state.settings.display,
})

export default connect(mapStateToProps, { switchDisplay })(HomePage)
