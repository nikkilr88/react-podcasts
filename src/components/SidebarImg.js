import React from 'react'
import ProgressiveImage from 'react-progressive-image'
import imgPlaceholder from '../images/image-placeholder.png'

const SidebarImg = ({
  handleOnClick,
  title,
  currentTrack,
  dataLink,
  index,
  imgSrc
}) => (
  <li
    onClick={handleOnClick}
    title={title}
    data-link={dataLink}
    className={title === currentTrack ? 'sidebar-selected' : ''}
  >
    <ProgressiveImage delay={1000} src={imgSrc} placeholder={imgPlaceholder}>
      {src => <img src={src} className='img-link' alt='an image' />}
    </ProgressiveImage>
  </li>
)

export default SidebarImg
