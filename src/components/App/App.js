import React, { Component, Fragment } from 'react'
import BoilerplateImage from '../../images/boilerplate-img.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>Parcel React Boilerplate</h1>
        <p>Have fun building! You got this!</p>
        <img src={BoilerplateImage} alt="heart girl" />
      </Fragment>
    )
  }
}

export default App
