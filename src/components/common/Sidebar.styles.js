import styled from 'styled-components'

export const StyledSidebar = styled.aside`
  height: 100%;
  width: 200px;
  background: #111;
  z-index: 997;
  display: flex;
  flex-direction: column;
  grid-area: Sidebar;

  ul {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  li {
    list-style: none;
    font-size: 1.4rem;
    margin: 25px 0;
    text-align: left;
    color: #777;
    font-weight: normal;

    &:hover {
      color: #fff;
    }
  }

  a:not(.logo) {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 35px;
    font-weight: 600;
  }

  .sidebar-top {
    margin: 0;
    padding: 50px 35px;

    img {
      width: 25px;
      height: auto;
      border-radius: 5px;
      align-self: center;
      padding: 0;
    }
  }

  .fas {
    margin-right: 15px;
    font-size: 18px;
    text-align: center;
  }

  .settings {
    margin-top: auto;
  }

  .sidebar-active {
    color: #fff;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: -5px;
      bottom: -5px;
      width: 4px;
      background: #cd84f1;
    }
  }

  @media only screen and (max-width: 900px) {
    display: none;
  }
`
