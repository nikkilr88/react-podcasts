import React, { Component, Fragment } from 'react'
import Sound from 'react-sound'
import PodcastListElement from './PodcastListElement'
import Controls from './Controls'
import Header from './Header'
import Loader from './Loader'

import { convertSeconds } from '../utils'

class App extends Component {
  state = {
    isLoading: true,
    title: '',
    description: '',
    img: '',
    episodes: [],
    track: { title: '', src: '' },
    position: 0,
    playingStatus: Sound.status.PLAYING
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
  pauseAudio = () => {
    this.setState(() => ({
      playingStatus:
        this.state.playingStatus == Sound.status.PLAYING
          ? Sound.status.PAUSED
          : Sound.status.PLAYING
    }))
  }

  // Stop audio
  stopAudio = () => {
    this.setState(() => ({
      track: { title: '', src: '' },
      position: 0
    }))
  }

  // Fastforward track 10 seconds
  fastforward = () => {
    this.setState(prevState => ({
      position: (prevState.position += 1000 * 10)
    }))
  }

  // Rewind track 5 seconds
  rewind = () => {
    this.setState(prevState => ({
      position: (prevState.position -= 1000 * 5)
    }))
  }

  // Handle track playback
  handleOnPlaying = data => {
    if (this.state.playingStatus != Sound.status.PLAYING) return
    this.setState(() => ({
      position: data.position
    }))
  }

  handleOnError = data => {
    console.log(data)
  }

  // Fetch podcast data on mount
  // http://freecodecamp.libsyn.com/rss
  // https://feed.syntax.fm/rss
  componentDidMount() {
    fetch('https://xmlparse.glitch.me/?url=https://feed.syntax.fm/rss')
      .then(res => res.json())
      .then(data => {
        this.setState(() => ({
          title: data.rss.channel.title._text,
          description: data.rss.channel.description._cdata,
          img: data.rss.channel.image.url._text,
          episodes: data.rss.channel.item,
          isLoading: false
        }))
      })
  }

  render() {
    const episodeList = this.state.episodes
      .filter(e => e.hasOwnProperty('enclosure'))
      .map((e, i) => (
        <PodcastListElement
          key={i}
          date={e.pubDate._text}
          title={e.title._text}
          audio={e.enclosure._attributes.url}
          setAudio={this.setAudio}
        />
      ))

    return (
      <Fragment>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            <Header
              title={this.state.title}
              description={this.state.description}
              img={this.state.img}
            />
            <div className="items">{episodeList}</div>
          </Fragment>
        )}

        {this.state.track.src && (
          <Fragment>
            <Sound
              url={this.state.track.src}
              playStatus={this.state.playingStatus}
              playFromPosition={this.state.position}
              onPlaying={this.handleOnPlaying}
              onError={this.handleOnError}
            />
            <Controls
              playingStatus={this.state.playingStatus}
              pauseAudio={this.pauseAudio}
              stopAudio={this.stopAudio}
              fastforward={this.fastforward}
              rewind={this.rewind}
              audio={this.state.track}
              time={convertSeconds(this.state.position / 1000)}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default App
