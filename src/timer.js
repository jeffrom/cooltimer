function noop() {}

export class Timer {
  constructor({ onTick, onComplete }) {
    this.onTick = onTick || noop
    this.onComplete = onComplete || noop
    this.duration = 0
    this.reset()
  }

  start(duration) {
    this.duration = duration
    this.clearInterval()
    this.t = setInterval(this.tick.bind(this), 1000)
  }

  clearInterval() {
    if (this.t) {
      clearInterval(this.t)
      this.t = null
    }
  }

  tick() {
    // console.log('tick')
    if (++this.curr > this.duration) {
      this.onComplete()
    } else {
      this.onTick()
    }
  }

  pause() {
    this.clearInterval()
  }

  reset() {
    this.curr = 0
  }

  remaining() {
    return this.duration - this.curr
  }
}
