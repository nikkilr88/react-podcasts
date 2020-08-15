import React from 'react'
import ProgressiveImage from 'react-progressive-image'

// Data
import { podcasts } from '../../data/podcasts'

// Styles
import { StyledChannelInfo } from './ChannelInfo.styles'

const ChannelInfo = ({
  theme,
  podcast: { img, title, description, website, author },
}) => {
  // FIXME: This causes problems if podcast name changes
  // ?: Look for different progressive image package

  const podcastImage = podcasts
    .filter(p => p.name === title)[0]
    .img.replace(/100x100/g, '30x30')

  return (
    <StyledChannelInfo className="ChannelInfo">
      <ProgressiveImage src={img} placeholder={podcastImage}>
        {src => (
          <img
            src={src}
            className={`img ${theme}`}
            alt={`${title} podcast cover`}
          />
        )}
      </ProgressiveImage>
      <div className="text-wrapper">
        <h1 className="title">{title}</h1>
        <p className={`author ${theme}`}>{author}</p>
        <p className="description">
          {description || 'No Description Available :('}
        </p>
        <a
          href={website}
          target="_blank"
          className="website"
          aria-label={`Visit ${title} website`}
        >
          <i className="fas fa-external-link-alt" />
          Visit website
        </a>
      </div>
    </StyledChannelInfo>
  )
}

export default ChannelInfo
