export function prettySeconds(s) {
  if (s > 60) {
    const minutes = Math.floor(s / 60)
    const remainingSecs = s % 60
    const secs = remainingSecs ? `${remainingSecs}s` : ''

    return `${minutes}m${secs}`
  }
  return `${s}s`
}

export function hexToRGB(s) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const hex = s.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  })
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (result) {
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ]
  }
  return null
}

// function rgbToHex(r, g, b) {
//   return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
// }

export function invertColor([r, g, b]) {
  const o = Math.round((r * 299 + g * 587 + b * 114) / 1000)

  if (o > 125) {
    // dark
    return '#000'
  }
  return '#FFF'
}
