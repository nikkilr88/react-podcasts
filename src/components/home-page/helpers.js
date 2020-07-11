import { useState, useEffect } from 'react'
import { useSpring } from 'react-spring/web.cjs'

// Images
import FallbackImage from '../../images/grey_square.jpg'

// ! Handle network image fails
export const handleImageError = event => {
  event.target.src = FallbackImage
}

// !: FADE IN HOOK
export const useFadeInOnMount = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return useSpring({
    opacity: mounted ? 1 : 0,
    config: { duration: 250 },
  })
}
