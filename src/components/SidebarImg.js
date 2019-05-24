import React from 'react'

const SidebarImg = ({ handleOnClick, title, link, index, imgSrc }) => (
  <li
    onClick={handleOnClick}
    title={title}
    data-link={link}
    className={index === 0 ? 'sidebar-selected' : ''}
  >
    <img className='img-link' src={imgSrc} alt='podcast icon' />
  </li>
)

export default SidebarImg
