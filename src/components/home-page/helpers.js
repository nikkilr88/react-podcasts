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
  })
}

// // ! Display podcasts as grid
// export const displayGrid = podcasts => {
//   return podcasts.map(podcast => (
//     <Link
//       key={podcast.name}
//       className="Home-podcast"
//       to={`/podcast/${podcast.name.replace(/ /g, '_')}`}
//     >
//       <div>
//         <ProgressiveImage
//           src={podcast.img.replace(/100x100/g, '360x360')}
//           placeholder={podcast.img.replace(/100x100/g, '30x30')}
//         >
//           {src => (
//             <img
//               src={src ? src : Fallback}
//               onError={handleImageError}
//               alt="podcast cover"
//             />
//           )}
//         </ProgressiveImage>

//         <h3 className="Home-podcast-title">{podcast.name}</h3>
//       </div>
//     </Link>
//   ))
// }

// // ! Display podcasts as category sections
// export const sortByCategory = (categories, podcasts) => {
//   return categories.map(category => {
//     const categoryPodcasts = podcasts
//       .filter(podcast => podcast.category === category.category)
//       .map(podcast => (
//         <Link
//           key={podcast.name}
//           className="Home-podcast"
//           to={`/podcast/${podcast.name.replace(/ /g, '_')}`}
//         >
//           <div>
//             <ProgressiveImage
//               src={podcast.img.replace(/100x100/g, '360x360')}
//               placeholder={podcast.img.replace(/100x100/g, '30x30')}
//             >
//               {src => <img src={src ? src : Fallback} alt="podcast cover" />}
//             </ProgressiveImage>

//             <h3 className="Home-podcast-title">{podcast.name}</h3>
//           </div>
//         </Link>
//       ))
//     return (
//       <section key={category.category} className="Home-category">
//         <h2 className="Home-category-title">{category.display}</h2>
//         <p className="Home-category-subtitle">{category.subtitle}</p>
//         <div className="Home-podcasts">{categoryPodcasts}</div>
//       </section>
//     )
//   })
// }
