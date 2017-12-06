import m from 'mithril'

import { Timer } from 'timer'
import { beep, beepDone } from 'beep'

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

  playPause() {
    console.log(this.timer.isPaused())
    if (this.timer.isPaused()) {
      this.start()
    } else {
      this.timer.pause()
    }
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
    const remaining = this.runner.timer.remaining()

    if (remaining < 3) {
      beep()
    }
    m.redraw()
  }

  onComplete() {
    this.runner.next()
    beepDone()

    m.redraw()
  }

  view() {
    let inner
    const runner = this.runner

    if (runner.finished) {
      inner = [
        m(
          'h1.title.finished',
          {
            onclick: () => {
              runner.stop()
            },
          },
          'DONE!!!'
        ),
      ]
    } else {
      const btnType = runner.timer.isPaused() ? 'play' : 'pause'

      inner = [
        m('h1.title.runner-label', runner.step.label),
        m('h2.subtitle.runner-timeleft', runner.timer.remaining()),
        m('.runner-controls', [
          m(
            `button.button.is-large.${btnType}-button`,
            { onclick: () => runner.playPause() },
            btnType
          ),
          m(
            'button.button.is-large.next-button',
            { onclick: () => runner.next() },
            'next'
          ),
        ]),
      ]
    }

    return m('section.runner.hero.is-fullheight', [
      m('.hero-body', [m('.container.has-text-centered', inner)]),
    ])
  }
}
