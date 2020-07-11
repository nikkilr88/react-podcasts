import styled from 'styled-components'

export const StyledLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  animation: rotate 2s infinite;
  ${({ theme }) => `
    border: 4px solid ${theme.loaderColor};
  `}
  border-left: 4px solid transparent;

  @media only screen and (max-width: 900px) {
    margin-left: 0;
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`
