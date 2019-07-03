import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import Sidebar from '../components/Sidebar'
import Controls from '../components/Controls'
import MobileNav from '../components/MobileNav'
import BackButton from '../components/BackButton'

// Pages
import HomePage from '../pages/Home'
import NotFound from '../pages/NotFound'
import SettingsPage from '../pages/Settings'
import PodcastPage from '../pages/PodcastPage'
import NowPlayingPage from '../pages/NowPlaying'

const AppRouter = ({ theme }) => (
  <Router>
    <MobileNav />
    <div className={`app-wrapper ${theme}`}>
      <div>
        <Sidebar />
      </div>
      <div className='app-wrapper-content'>
        <BackButton />
        <Controls />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/nowplaying' exact component={NowPlayingPage} />
          <Route path='/settings' exact component={SettingsPage} />
          <Route path='/podcast/:podcast' exact component={PodcastPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </Router>
)

const mapStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(AppRouter)
