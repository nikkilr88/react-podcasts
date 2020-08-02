import styled, { css } from 'styled-components'

const MobileNav = css`
  position: fixed;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  font-size: 20px;
  z-index: 9999;
  display: none;
  transition: background 0.2s;
  color: ${({ theme }) => theme.appbar.color};
  background: ${({ theme }) => theme.appbar.backgroundColor};

  .fas {
    margin-right: 5px;
  }

  @media only screen and (max-width: 900px) {
    display: flex;
  }
`

export const StyledMobileNavTop = styled.nav`
  ${MobileNav}
  padding: 15px 20px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 18px;
  font-weight: bold;
  position: sticky;
  top: 0;
  left: 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.appbar.borderColor}`};
  /* box-shadow: ${({ theme }) =>
    theme.name === 'dark' && '0 1px #3f3f3f, 0 2px #222'}; */

  .MobileNav-back {
    font-size: 14px;
    color: inherit;
  }
`

export const StyledMobileNavBottom = styled.nav`
  ${MobileNav}
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: space-between;
  border-top: ${({ theme }) => `1px solid ${theme.appbar.borderColor}`};

    /* box-shadow: ${({ theme }) =>
      theme.name === 'dark' && '0 -1px #3f3f3f, 0 -2px #222'}; */


  .MobileNav-icon {
    opacity: 0.35;
    color: ${({ theme }) => theme.appbar.color};
  }

  .active-nav-item .fas {
    opacity: 1;
  }

  .nowPlaying-active {
    position: relative;
  }

  .nowPlaying-active:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: -5px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    border: ${({ theme }) => `2px solid ${theme.appbar.backgroundColor}`};
    background: #2980b9;
  }
`
