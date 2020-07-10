import styled from 'styled-components'

export const StyledBackButton = styled.button`
  display: block;
  margin-bottom: 35px;
  color: ${({ theme }) => theme.textSecondary};

  @media only screen and (max-width: 900px) {
    display: none;
  }
`
