import m from 'mithril'

import { Timer } from 'timer'

const PLACEHOLDER_STEP = {
  time: 0,
}

export class RunnerView {
  constructor(phases) {
    this.phases = phases
    this.timer = new Timer({
      onTick: this.onTick.bind(this),
      onComplete: this.onComplete.bind(this),
    })

    this.reset()
  }

  reset() {
    this.phaseIdx = 0
    this.stepIdx = 0
    this.step = PLACEHOLDER_STEP
  }

  onTick() {
    m.redraw()
  }

  onComplete() {
    this.next()

    m.redraw()
  }

  start() {
    if (this.step === PLACEHOLDER_STEP) {
      this.step = this.phases[0].steps[0]
    }
    console.log('start', this.step)
    this.timer.start(this.step.time)
  }

  pause() {
    console.log('pause')
    this.timer.pause()
  }

  stop() {}

  next() {
    const phase = this.phases[this.phaseIdx]

    this.timer.pause()
    this.timer.reset()

    if (++this.stepIdx > phase.steps.length - 1) {
      this.phaseIdx++
      this.stepIdx = 0
    }
    if (this.phaseIdx > this.phases.length - 1) {
      // ALL DONE
      console.log('next: done')
      return null
    }

    this.step = this.phases[this.phaseIdx].steps[this.stepIdx]
    this.timer.start(this.step.time)

    console.log('next', this.step)
    return this.step
  }

  view() {
    return m('.runner', [
      m('.runner-label', this.step.label),
      m('.runner-timeleft', this.timer.remaining()),
      m('.runner-controls', [
        m('button.pause-button', { onclick: this.pause.bind(this) }, 'pause'),
        m('button.stop-button', { onclick: this.stop.bind(this) }, 'stop'),
        m('button.next-button', { onclick: this.next.bind(this) }, 'next'),
      ]),
    ])
  }
}
