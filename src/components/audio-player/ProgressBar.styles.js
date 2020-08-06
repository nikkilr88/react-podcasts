import styled from 'styled-components'

export const StyledProgressBar = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 600px) {
    position: relative;
    min-width: 100%;
    transform: none;
    left: 0;
    padding: 20px 0 0;
  }

  .times {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    color: #999;
  }

  .background {
    height: 5px;
    width: 300px;
    margin: 0 auto 0 auto;
    border-radius: 50px;
    position: relative !important;
    background: ${({ theme }) => theme.foregroundColor};

    @media (max-width: 600px) {
      width: 100%;
    }
  }

  .bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background: ${({ theme }) =>
      theme.name === 'black'
        ? '#c31432'
        : 'linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99)'};
    border-radius: 50px;
  }
`
