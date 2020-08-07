import styled from 'styled-components'

export const StyledVolume = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fcfcfc;
  background: rgba(0, 0, 0, 0.76);
  backdrop-filter: blur(10px);
  padding: 25px;
  border-radius: 10px;
  z-index: 9999;

  h3 {
    margin-bottom: 10px;
  }

  .wrapper {
    position: relative;
    height: 20px;
    width: 100px;
    background: #000;
    opacity: 0.5;
  }
  .bar {
    position: absolute;
    background: #3498db;
    height: 100%;
    bottom: 0;
  }
`
