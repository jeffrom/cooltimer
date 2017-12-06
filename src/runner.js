import m from 'mithril'

import { Timer } from 'timer'

const PLACEHOLDER_STEP = {
  time: 0,
}

class Runner {
  constructor({ phases, onRunFinished, onTick, onComplete }) {
    this.phases = phases
    this.onRunFinished = onRunFinished || function noop() {}

    this.timer = new Timer({
      onTick: onTick,
      onComplete: onComplete,
    })

    this.reset()
  }

  reset() {
    this.phaseIdx = 0
    this.stepIdx = 0
    this.step = PLACEHOLDER_STEP
    this.finished = false
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

  stop() {
    console.log('stop')
    this.finished = true
    this.timer.pause()
    this.timer.reset()
    this.onRunFinished()
  }

  next() {
    const phase = this.phases[this.phaseIdx]

    this.timer.pause()
    this.timer.reset()

    this.stepIdx++
    if (this.stepIdx > phase.steps.length - 1) {
      console.log('switching phases')
      this.phaseIdx++
      this.stepIdx = 0
    }
    if (this.phaseIdx > this.phases.length - 1) {
      // ALL DONE
      console.log('next: done')
      this.finished = true
      this.stop()
      return null
    }

    this.step = this.phases[this.phaseIdx].steps[this.stepIdx]
    this.timer.start(this.step.time)

    console.log('next', this.step)
    return this.step
  }
}

export class RunnerView {
  constructor(phases, onRunFinished) {
    this.runner = new Runner({
      phases,
      onRunFinished,
      onTick: this.onTick.bind(this),
      onComplete: this.onComplete.bind(this),
    })
  }

  onTick() {
    m.redraw()
  }

  onComplete() {
    this.runner.next()

    m.redraw()
  }

  view() {
    let inner
    const runner = this.runner

    if (this.finished) {
      inner = [m('.finished', { onclick: runner.onRunFinished }, 'DONE!!!')]
    } else {
      inner = [
        m('.runner-label', runner.step.label),
        m('.runner-timeleft', runner.timer.remaining()),
        m('.runner-controls', [
          m('button.pause-button', { onclick: () => runner.pause() }, 'pause'),
          m('button.play-button', { onclick: () => runner.start() }, 'play'),
          m('button.stop-button', { onclick: () => runner.stop() }, 'stop'),
          m('button.next-button', { onclick: () => runner.next() }, 'next'),
        ]),
      ]
    }

    return m('.runner', inner)
  }
}
