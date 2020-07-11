import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

// Wrappers
import AppWrapper from '../components/common/AppWrapper.component'
import MainContent from '../components/common/MainContent.component'

// Components
import Sidebar from '../components/common/Sidebar.component'
import MobileNav from '../components/common/MobileNav.component'
import BackButton from '../components/common/BackButton.component'
import Controls from '../components/audio-player/Controls.component'

// Pages
import HomePage from '../pages/Home'
import NotFound from '../pages/NotFound'
import SettingsPage from '../pages/Settings'
import PodcastPage from '../pages/PodcastPage'
import BookmarkedPage from '../pages/Bookmarked'
import NowPlayingPage from '../pages/NowPlaying'

const AppRouter = () => {
  const currentTheme = useContext(ThemeContext)

  return (
    <Router>
      <MobileNav />
      <AppWrapper>
        <Sidebar />
        <MainContent theme={currentTheme}>
          <BackButton />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/settings" exact component={SettingsPage} />
            <Route path="/nowplaying" exact component={NowPlayingPage} />
            <Route path="/bookmarked" exact component={BookmarkedPage} />
            <Route path="/podcast/:podcast" exact component={PodcastPage} />
            <Route component={NotFound} />
          </Switch>
        </MainContent>
        <Controls />
      </AppWrapper>
    </Router>
  )
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
})

export default connect(mapStateToProps)(AppRouter)
