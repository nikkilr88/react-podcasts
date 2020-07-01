import React, { Component, Fragment } from 'react'
import { NavLink as Link } from 'react-router-dom'
import { connect } from 'react-redux'

// Images
import Logo from '../images/devcasts-logo-slant.png'

// Styles
import '../css/Sidebar.styles.css'

class Sidebar extends Component {
  state = {
    showSidebar: false
  }

  toggleSidebar = e => {
    this.setState(prevState => ({
      showSidebar: !prevState.showSidebar
    }))
  }

  render() {
    const { theme, switchTheme } = this.props

    return (
      <Fragment>
        <div
          className={`sidebar ${theme} ${this.state.showSidebar &&
            'sidebar-out'}`}
        >
          <ul>
            <li className="sidebar-top">
              <Link to="/">
                <img src={Logo} alt="dev casts logo" />
              </Link>
            </li>
            <li className="sidebar-link">
              <Link to="/" activeClassName="sidebar-active" exact>
                <i className="fas fa-podcast" />
                <h4>Podcasts</h4>
              </Link>
            </li>
            <li className="sidebar-link">
              <Link to="/bookmarked" activeClassName="sidebar-active" exact>
                <i className="fas fa-bookmark" />
                <h4>Bookmarked</h4>
              </Link>
            </li>
            <li className="sidebar-link settings">
              <Link to="/settings" activeClassName="sidebar-active" exact>
                <i className="fas fa-cog" />
                <h4>Settings</h4>
              </Link>
            </li>
          </ul>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.settings.theme
})

export default connect(mapStateToProps)(Sidebar)
