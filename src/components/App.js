import React, { Component, Fragment } from 'react'
import Sound from 'react-sound'
import PodcastListElement from './PodcastListElement'
import Controls from './Controls'
import Header from './Header'
import Loader from './Loader'

import { convertSeconds, fetchData } from '../utils'

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
      position: data.position,
      duration: data.duration
    }))
  }

  handleOnError = data => {
    console.log(data)
  }

  // http://freecodecamp.libsyn.com/rss
  // https://feed.syntax.fm/rss
  // https://rss.simplecast.com/podcasts/363/rss
  // http://lavieencode.libsyn.com/rss

  // Fetch podcast data on mount
  componentDidMount() {
    fetchData('https://feed.syntax.fm/rss').then(data => {
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
            <Header img={this.state.img} />

            <div className="items">
              <div className="channel-info">
                <h1 className="title">{this.state.title}</h1>
                <p>{this.state.description}</p>
              </div>
              <h1 className="episodes">Episodes</h1>
              {episodeList}
            </div>
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
              position={this.state.position}
              duration={this.state.duration}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default App
