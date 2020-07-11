import React, { useContext } from 'react'
import { NavLink as Link } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

// Images
import Logo from '../../images/DevCasts-Logo.svg'

// Styles
import { StyledSidebar } from './Sidebar.styles'

const Sidebar = () => {
  // Get theme just incase we want to change sidebar color later on
  const currentTheme = useContext(ThemeContext)

  return (
    <StyledSidebar>
      <ul>
        <li className="sidebar-top">
          <Link to="/" className="logo">
            <img src={Logo} alt="dev casts logo" />
          </Link>
        </li>
        <li>
          <Link to="/" activeClassName="sidebar-active" exact>
            <i className="fas fa-podcast" />
            Library
          </Link>
        </li>
        <li>
          <Link to="/bookmarked" activeClassName="sidebar-active" exact>
            <i className="fas fa-bookmark" />
            Bookmarked
          </Link>
        </li>
        <li className="settings">
          <Link to="/settings" activeClassName="sidebar-active" exact>
            <i className="fas fa-cog" />
            Settings
          </Link>
        </li>
      </ul>
    </StyledSidebar>
  )
}

export default Sidebar
