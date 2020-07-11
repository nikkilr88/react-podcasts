import styled from 'styled-components'

export const StyledMainContent = styled.main`
  padding: 50px;
  overflow-y: scroll;
  grid-area: Content;
  position: relative;

  ${({ theme }) => `
    background: ${theme.mainContentBg};
    color: ${theme.textPrimary};
  `}

  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.mainScrollbarColor};
  }

  @media only screen and (max-width: 900px) {
    padding: 20px;
    height: calc(100vh - 120px);
  }
`
