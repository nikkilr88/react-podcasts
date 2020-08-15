import styled from 'styled-components'

export const StyledChannelInfo = styled.div`
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    padding-top: 0;
  }

  .img {
    flex: 0 0 auto;
    display: block;
    height: 275px;
    width: 275px;
    margin-right: 25px;
    border-radius: 10px;

    @media (max-width: 600px) {
      margin: 0 0 25px;
      height: 150px;
      width: 150px;
    }
  }

  .title {
    margin: 5px 0;
    font-size: 3.2em;
    text-align: left;

    @media (max-width: 600px) {
      font-size: 2.6em;
      margin: 2px 0;
    }
  }

  .author {
    margin-bottom: 30px;
    font-size: 1.6em;
    font-weight: 100;
    opacity: 0.5;
  }

  .description {
    font-size: 1.6rem;
    line-height: 1.5;
    text-align: left;
  }

  .text-wrapper {
    flex: 1 1 auto;
    text-align: left;
  }

  .website {
    color: #fff;
    background: #3498db;
    display: inline-block;
    padding: 10px 20px;
    font-size: 1.4rem;
    text-decoration: none;
    margin-top: 25px;
    border-radius: 10px;

    .fas {
      margin-right: 5px;
    }

    a {
      color: #999;
      text-decoration: none;
      margin-left: 5px;
    }
  }
`
