import React, { Component, Fragment } from 'react'
import SoundWrapper from './SoundWrapper'
import Sound from 'react-sound'
import Controls from './Controls'
import Header from './Header'
import Loader from './Loader'
import Sidebar from './Sidebar'
import Volume from './Volume'
import Episodes from './Episodes'

import { convertSeconds } from '../utils'

import '../css/themes/light.css'
import '../css/themes/dark.css'

class App extends Component {
  state = {
    isLoading: true,
    title: '',
    description: '',
    img: '',
    episodes: [],
    track: { title: '', src: '' },
    position: 0,
    duration: 0,
    playingStatus: Sound.status.PLAYING,
    volume: 75,
    showVolume: false,
    theme: 'light' // light or dark
  }

  // Update state with track information
  setAudio = (audio, title) => {
    this.setState(() => ({
      track: {
        title: title,
        src: audio
      },
      playingStatus: Sound.status.PLAYING,
      position: 0
    }))
  }

  // Pause audio
  pauseAudio = e => {
    e && e.target.blur()
    if (this.state.position == 0) return
    this.setState(prevState => ({
      playingStatus:
        prevState.playingStatus == Sound.status.PLAYING
          ? Sound.status.PAUSED
          : Sound.status.PLAYING
    }))
  }

  // Stop audio
  stopAudio = e => {
    this.setState(() => ({
      track: { title: '', src: '' },
      position: 0
    }))
    this.resetButtons()
  }

  // Fastforward track 10 seconds
  fastforward = e => {
    e && e.target.blur()
    if (this.state.position == 0) return
    this.setState(prevState => ({
      position: prevState.position + 1000 * 10
    }))
  }

  // Rewind track 5 seconds
  rewind = e => {
    e && e.target.blur()
    if (this.state.position == 0) return
    this.setState(prevState => ({
      position: prevState.position - 1000 * 5
    }))
  }

  // Handle track playback
  handleOnPlaying = data => {
    if (this.state.playingStatus != Sound.status.PLAYING) return
    this.setState(() => ({
      position: data.position,
      duration: data.duration
    }))
  }

  handleOnFinishedPlaying = () => {
    this.setState(() => ({
      position: 1,
      playingStatus: Sound.status.PAUSED
    }))
  }

  handleOnError = err => {
    console.log(err)
  }

  showVolume = () => {
    if (this.timeout) {
      clearInterval(this.timeout)
    }

    this.setState(() => ({ showVolume: true }))

    this.timeout = setTimeout(() => {
      this.setState(() => ({ showVolume: false }))
    }, 1000)
  }

  // Set volume
  setVolume = e => {
    if (!this.state.track.src) return

    this.showVolume()

    const val = e.which == 38 ? 5 : -5

    if (this.state.volume + val < 0 || this.state.volume + val > 100) return

    this.setState(prevState => ({
      volume: prevState.volume + val
    }))
  }

  // Pause, skip forward / back
  keyboardShortcuts = e => {
    switch (e.which) {
      case 32:
        this.pauseAudio()
        break
      case 37:
        this.rewind()
        break
      case 39:
        this.fastforward()
        break
    }
  }

  // Keyup keyboard shortcuts
  handleOnKeyUp = e => {
    switch (e.which) {
      case 32:
      case 39:
      case 37:
        this.keyboardShortcuts(e)
        break
      case 38:
      case 40:
        this.setVolume(e)
        break
    }
  }

  // Fetch podcast data and set state
  fetchData = url => {
    this.setState(() => ({ isLoading: true }))
    fetch(`https://xmlparse.glitch.me/?url=${url}`)
      .then(res => res.json())
      .then(data => {
        this.setState(() => ({
          title: data.rss.channel.title._text,
          description:
            data.rss.channel.description._cdata ||
            data.rss.channel.description._text,
          img: data.rss.channel.image.url._text.replace(
            /http:\/\//,
            'https://'
          ),
          episodes: data.rss.channel.item.filter(e =>
            e.hasOwnProperty('enclosure')
          ),
          isLoading: false
        }))
      })
  }

  // Fetch podcast data on mount
  componentDidMount() {
    this.fetchData('https://feed.syntax.fm/rss')

    // Keyboard controls
    document.addEventListener('keyup', this.handleOnKeyUp, false)

    // Prevent spacebar scrolling
    document.addEventListener('keydown', e => {
      if (this.state.track.src.length < 1) return

      if (e.which == 32 || e.which == 38 || e.which == 40) {
        e.preventDefault()
        return false
      }
    })
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleOnKeyUp, false)
  }

  render() {
    return (
      <Fragment>
        <Sidebar fetchData={this.fetchData} theme={this.state.theme} />
        {this.state.isLoading ? (
          <Loader theme={this.state.theme} />
        ) : (
          <Fragment>
            {this.state.showVolume && (
              <Volume volume={this.state.volume} theme={this.state.theme} />
            )}

            <Header img={this.state.img} />
            <Episodes
              episodes={this.state.episodes}
              nowPlaying={this.state.track.title}
              setAudio={this.setAudio}
              theme={this.state.theme}
              title={this.state.title}
              description={this.state.description}
              img={this.state.img}
            />
          </Fragment>
        )}

        {this.state.track.src && (
          <Fragment>
            <SoundWrapper
              url={this.state.track.src}
              volume={this.state.volume}
              playStatus={this.state.playingStatus}
              playFromPosition={this.state.position}
              onPlaying={this.handleOnPlaying}
              onError={this.handleOnError}
              onFinishedPlaying={this.handleOnFinishedPlaying}
            />
            <Controls
              playingStatus={this.state.playingStatus}
              pauseAudio={this.pauseAudio}
              stopAudio={this.stopAudio}
              fastforward={this.fastforward}
              rewind={this.rewind}
              audio={this.state.track}
              time={convertSeconds(this.state.position / 1000)}
              position={this.state.position}
              duration={this.state.duration}
              volume={this.state.volume}
              theme={this.state.theme}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default App
