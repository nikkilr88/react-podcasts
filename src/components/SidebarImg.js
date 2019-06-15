import React from 'react'
import { NavLink as Link } from 'react-router-dom'

import ProgressiveImage from 'react-progressive-image'
import imgPlaceholder from '../images/image-placeholder.png'

const SidebarImg = ({ title, imgSrc }) => (
  <Link
    activeClassName='sidebar-selected'
    to={`/podcast/${title.replace(/ /g, '_')}`}
  >
    <li title={title}>
      <ProgressiveImage delay={1000} src={imgSrc} placeholder={imgPlaceholder}>
        {src => <img src={src} className='img-link' alt='an image' />}
      </ProgressiveImage>
    </li>
  </Link>
)

export default SidebarImg
