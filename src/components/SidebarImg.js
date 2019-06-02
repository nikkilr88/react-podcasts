import React from 'react'
import { connect } from 'react-redux'

import ProgressiveImage from 'react-progressive-image'
import imgPlaceholder from '../images/image-placeholder.png'

const SidebarImg = ({
  index,
  title,
  imgSrc,
  dataLink,
  currentTrack,
  handleOnClick
}) => (
  <li
    title={title}
    data-link={dataLink}
    onClick={handleOnClick}
    className={title === currentTrack ? 'sidebar-selected' : ''}
  >
    <ProgressiveImage delay={1000} src={imgSrc} placeholder={imgPlaceholder}>
      {src => <img src={src} className='img-link' alt='an image' />}
    </ProgressiveImage>
  </li>
)

const mapStateToProps = state => ({
  currentTrack: state.podcast.podcast.title
})

export default connect(mapStateToProps)(SidebarImg)
