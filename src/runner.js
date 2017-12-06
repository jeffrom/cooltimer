import m from 'mithril'

import { Timer } from 'timer'

const PLACEHOLDER_STEP = {
  time: 0,
}

class Runner {
  constructor({ phases, onTick, onComplete }) {
    this.phases = phases

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
    this.timer.start(this.step.time)
  }

  pause() {
    this.timer.pause()
  }

  stop() {
    this.finished = true
    this.timer.pause()
    this.timer.reset()
  }

  next() {
    const phase = this.phases[this.phaseIdx]

    this.timer.pause()
    this.timer.reset()

    this.stepIdx++
    if (this.stepIdx > phase.steps.length - 1) {
      this.phaseIdx++
      this.stepIdx = 0
    }
    if (this.phaseIdx > this.phases.length - 1) {
      // ALL DONE
      this.finished = true
      this.stop()
      return null
    }

    this.step = this.phases[this.phaseIdx].steps[this.stepIdx]
    this.timer.start(this.step.time)

    return this.step
  }
}

export class RunnerView {
  constructor(phases) {
    this.runner = new Runner({
      phases,
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

    if (runner.finished) {
      inner = [m('h1.title.finished', 'DONE!!!')]
    } else {
      inner = [
        m('h1.title.runner-label', runner.step.label),
        m('h2.subtitle.runner-timeleft', runner.timer.remaining()),
        m('.runner-controls', [
          m('button.pause-button', { onclick: () => runner.pause() }, 'pause'),
          m('button.play-button', { onclick: () => runner.start() }, 'play'),
          m('button.next-button', { onclick: () => runner.next() }, 'next'),
        ]),
      ]
    }

    return m('section.runner.hero.is-fullheight', [
      m('.hero-body', [m('.container.has-text-centered', inner)]),
    ])
  }
}
