import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

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

const AppRouter = ({ theme }) => (
  <Router>
    <MobileNav />
    <div className={`app-wrapper ${theme}`}>
      <Sidebar />
      {/* TODO: Create a component for app content */}
      <div className="app-wrapper-content">
        <BackButton />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/settings" exact component={SettingsPage} />
          <Route path="/nowplaying" exact component={NowPlayingPage} />
          <Route path="/bookmarked" exact component={BookmarkedPage} />
          <Route path="/podcast/:podcast" exact component={PodcastPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Controls />
    </div>
  </Router>
)

const mapStateToProps = state => ({
  theme: state.settings.theme,
})

export default connect(mapStateToProps)(AppRouter)
