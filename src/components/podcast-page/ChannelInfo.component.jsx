import React from 'react'
import ProgressiveImage from 'react-progressive-image'

// Data
import { podcasts } from '../../data/podcasts'

// Styles
import '../../css/ChannelInfo.styles.css'

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
    <div className={`ChannelInfo ${theme}`}>
      <ProgressiveImage src={img} placeholder={podcastImage}>
        {src => (
          <img
            src={src}
            alt="podcast cover"
            className={`ChannelInfo-img ${theme}`}
          />
        )}
      </ProgressiveImage>
      <div className="ChannelInfo-text">
        <h1 className="ChannelInfo-title">{title}</h1>
        <p className={`ChannelInfo-author ${theme}`}>{author}</p>
        <p>{description || 'No Description Available :('}</p>
        <a href={website} target="_blank" className="ChannelInfo-website">
          <i className="fas fa-external-link-alt" />
          Visit website
        </a>
      </div>
    </div>
  )
}

export default ChannelInfo
