import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from '../pages/Home'
import NotFound from '../pages/NotFound'
import Sidebar from '../components/Sidebar'
import Controls from '../components/Controls'
import PodcastPage from '../pages/PodcastPage'
import MobileNav from '../components/MobileNav'
import NowPlayingPage from '../pages/NowPlaying'

export default () => (
  <Router>
    <MobileNav />
    <div className='app-wrapper'>
      <div>
        <Sidebar />
      </div>
      <div className='app-wrapper-content'>
        <Controls />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/nowplaying' exact component={NowPlayingPage} />
          <Route path='/podcast/:podcast' exact component={PodcastPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </Router>
)
