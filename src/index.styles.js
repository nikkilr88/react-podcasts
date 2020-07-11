import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif;
    text-align: center;
    background: #fff;
    font-family: 'Open Sans';
  }

  html {
    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  strong {
    font-family: 'Roboto';
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
  }

  .error {
    z-index: 9999;
    position: absolute;
    top: 30%;
    left: 50%;
    background: #f5f5f5;
    transform: translateX(calc(-50% + 75px / 2));
    font-size: 1.3rem;
    color: #999;
    width: 250px;
  }

  .middle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    color: #999;
    font-weight: 100;
  }
`

export default GlobalStyles
