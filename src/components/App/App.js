import React, { Component } from 'react'
import BoilerplateImage from '../../images/boilerplate-img.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Parcel React Boilerplate</h1>
        <p>Have fun building! You got this!</p>
        <img src={BoilerplateImage} alt="heart girl" />
      </div>
    )
  }
}

export default App
