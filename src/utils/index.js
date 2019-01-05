export const convertSeconds = sec => {
  let h = Math.floor(sec / 3600)
  let m = Math.floor((sec % 3600) / 60)
  let s = Math.floor(sec % 60)

  let hDisplay = h <= 0 ? '' : `${h}:`
  let mDisplay = m < 10 ? `0${m}` : m
  let sDisplay = s < 10 ? `0${s}` : s

  return `${hDisplay}${mDisplay}:${sDisplay}`
}
