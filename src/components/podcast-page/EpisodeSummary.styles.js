import styled from 'styled-components'

export const StyledSummary = styled.div`
  position: fixed;
  max-width: 600px;
  width: 95%;
  max-height: 400px;
  height: auto;
  background: ${({ theme }) =>
    theme.name === 'black' ? theme.foregroundColor : theme.mainContentBg};
  color: ${({ theme }) => theme.textPrimary};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
  z-index: 999;

  @media (max-width: 600px) {
    transform: translate(0);
    left: 15px;
    top: 75px;
    right: 15px;
    bottom: 75px;
    max-height: 100%;
    width: auto;
  }

  .info {
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    small {
      opacity: 0.65;
    }
  }

  .scrollable {
    overflow-y: scroll;
    max-height: 400px;
    height: 100%;
    padding: 50px;

    @media (max-width: 600px) {
      max-height: 100%;
    }

    &::-webkit-scrollbar-thumb {
      background: #1b1b1b;
    }

    &::-webkit-scrollbar {
      width: 20px;
    }
  }

  .close {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #eee;
    font-size: 1.5rem;
    cursor: pointer;
    color: #555;
    z-index: 999;
  }

  a {
    border-bottom: 1px dotted #ccc;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 10px 0;
  }

  h3 {
    font-size: 2.5rem;
  }

  ul {
    margin-left: 25px;
    font-size: 1.5rem;
  }

  li {
    margin: 5px;
  }

  p {
    margin: 5px 0;
    font-size: 1.5rem;
    line-height: 1.5;
  }
`

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(5px);
`
