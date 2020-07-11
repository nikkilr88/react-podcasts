import styled from 'styled-components'

export const StyledAppWrapper = styled.div`
  display: grid;
  grid-template-areas:
    'Sidebar Content Content'
    'Controls Controls Controls';
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  height: 100vh;

  @media only screen and (max-width: 900px) {
    height: auto;
  }
`
