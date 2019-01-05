import React, { Component, Fragment } from 'react'
import PodcastListElement from './PodcastListElement'
import Controls from './Controls'

class App extends Component {
  state = {
    isLoading: true,
    title: '',
    description: '',
    img: '',
    episodes: [],
    audio: {}
  }

  setAudio = (audio, title) => {
    this.stopAudio()
    this.setState(() => ({
      audio: {
        title: title,
        src: new Audio(audio)
      }
    }))
  }

  pauseAudio = () => {
    if (!this.state.audio.src) return
    !this.state.audio.src.paused
      ? this.state.audio.src.pause()
      : this.state.audio.src.play()
  }

  stopAudio = () => {
    if (!this.state.audio.src) return
    this.state.audio.src.pause()
    this.state.audio.src.currentTime = 0
  }

  setAudioTime = () => {
    if (!this.state.audio.src) return
    this.setState(prevState => ({
      audio: {
        title: prevState.audio.title,
        src: prevState.audio.src,
        time: this.convertSeconds(this.state.audio.src.currentTime)
      }
    }))
    console.log('update time')
  }

  convertSeconds = sec => {
    let h = Math.floor(sec / 3600)
    let m = Math.floor((sec % 3600) / 60)
    let s = Math.floor(sec % 60)

    let hDisplay = h <= 0 ? '' : `${h}:`
    let mDisplay = m < 10 ? `0${m}` : m
    let sDisplay = s < 10 ? `0${s}` : s

    return `${hDisplay}${mDisplay}:${sDisplay}`
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.audio.title !== prevState.audio.title) {
      this.state.audio.src.play()
      setInterval(this.setAudioTime, 1000)
    }
  }

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
          <p>Loading...</p>
        ) : (
          <div className="test">
            <img src={this.state.img} alt="podcast image" />
            <p>{this.state.title}</p>
            <p>{this.state.description}</p>
            {episodeList}
          </div>
        )}
        {this.state.audio.src && (
          <Controls pauseAudio={this.pauseAudio} audio={this.state.audio} />
        )}
      </Fragment>
    )
  }
}

export default App
