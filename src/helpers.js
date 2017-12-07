export function prettySeconds(s) {
  if (s > 60) {
    const minutes = Math.floor(s / 60)
    const remainingSecs = s % 60
    const secs = remainingSecs ? `${remainingSecs}s` : ''

    return `${minutes}m${secs}`
  }
  return `${s}s`
}
