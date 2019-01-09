import React, { Component, Fragment } from 'react'
import SoundWrapper from './SoundWrapper'
import Sound from 'react-sound'
import PodcastListElement from './PodcastListElement'
import Controls from './Controls'
import Header from './Header'
import Loader from './Loader'
import Sidebar from './Sidebar'

import { convertSeconds, fetchData } from '../utils'

import '../css/ChannelInfo.css'

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
    this.resetButtons()
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

  // Reset play button styles
  resetButtons = e => {
    const btns = document.querySelectorAll('.btn')
    for (let btn of btns) {
      btn.classList.remove('selected')
      btn.innerHTML = '<i class="material-icons">play_arrow</i>'
    }
    if (!e) return
    e.target.classList.add('selected')
    e.target.innerHTML = '<i class="material-icons">volume_up</i>'
  }

  // Fetch podcast data and set state
  fetchData = url => {
    this.setState(() => ({ isLoading: true }))
    return fetch(`https://xmlparse.glitch.me/?url=${url}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState(() => ({
          title: data.rss.channel.title._text,
          description:
            data.rss.channel.description._cdata ||
            data.rss.channel.description._text,
          img: data.rss.channel.image.url._text,
          episodes: data.rss.channel.item,
          isLoading: false
        }))
      })
  }

  // Fetch podcast data on mount
  componentDidMount() {
    this.fetchData('https://feed.syntax.fm/rss')
  }

  render() {
    const episodeList = this.state.episodes
      .filter(e => e.hasOwnProperty('enclosure'))
      .map((e, i) => (
        <PodcastListElement
          key={i}
          date={e.pubDate._text}
          title={e.title._text}
          nowPlaying={this.state.track.title}
          audio={e.enclosure._attributes.url}
          setAudio={this.setAudio}
          resetButtons={this.resetButtons}
        />
      ))

    return (
      <Fragment>
        <Sidebar fetchData={this.fetchData} />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            <Header img={this.state.img} />
            <div className="items">
              <div className="channel-info">
                <img
                  className="channel-img"
                  src={this.state.img}
                  alt="podcast image"
                />
                <h1 className="title">{this.state.title}</h1>
                <p>{this.state.description || 'No Description Available :('}</p>
              </div>
              <h1 className="episodes">Episodes</h1>
              {episodeList}
            </div>
          </Fragment>
        )}

        {this.state.track.src && (
          <Fragment>
            <SoundWrapper
              url={this.state.track.src}
              playStatus={this.state.playingStatus}
              playFromPosition={this.state.position}
              onPlaying={this.handleOnPlaying}
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
