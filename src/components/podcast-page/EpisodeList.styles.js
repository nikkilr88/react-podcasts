import styled from 'styled-components'

export const StyledSearch = styled.input`
  flex-basis: 100%;
  padding: 15px 5px;
  margin: 20px 0 0;
  background: none;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  color: #eee;
  font-size: 1.6em;

  &:focus {
    outline: none;
    border-bottom: 2px solid #3498db;
  }
`

export const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px 15px;
  margin: 55px 0 35px;
  background: ${({ theme }) => theme.foregroundColor};
  border-radius: 10px;

  .title {
    text-align: left;
    display: block;
    font-size: 2.2em;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.textPrimary};

    small {
      margin-left: 5px;
      opacity: 0.5;
    }
  }

  .fas {
    color: ${({ theme }) => theme.textPrimary};
  }
`
