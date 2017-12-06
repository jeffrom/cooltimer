const beepData = require('beep.mp3')
const beepDoneData = require('beep-done.mp3')

const beepSound = new Audio(beepData)
const beepDoneSound = new Audio(beepDoneData)

export function beep() {
  beepSound.play()
}

export function beepDone() {
  beepDoneSound.play()
}
