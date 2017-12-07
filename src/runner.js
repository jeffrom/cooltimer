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
    this.repeats = 0
    this.step = PLACEHOLDER_STEP
    this.finished = false
    this.nextup = null
  }

  start() {
    if (this.step === PLACEHOLDER_STEP) {
      this.step = this.phases.phases[0].steps[0]
      this.nextup = this.peek()
    }
    this.timer.start(this.step.time)
  }

  playPause() {
    if (this.timer.isPaused()) {
      this.start()
    } else {
      this.timer.pause()
    }
  }

  stop() {
    this.finished = true
    if (this.timer) {
      this.timer.pause()
      this.timer.reset()
    }
  }

  peek() {
    const phase = this.phases.phases[this.phaseIdx]
    let nextStep = this.stepIdx + 1
    let nextPhase = this.phaseIdx
    let repeats = this.repeats

    if (nextStep > phase.steps.length - 1) {
      if (++repeats > (phase.repeats || 0)) {
        nextPhase++
        repeats = 0
      }
      nextStep = 0
    }
    if (nextPhase > this.phases.phases.length - 1) {
      return { label: 'DONE!' }
    }

    return this.phases.phases[nextPhase].steps[nextStep]
  }

  next() {
    const phase = this.phases.phases[this.phaseIdx]

    this.timer.pause()
    this.timer.reset()

    this.stepIdx++
    if (this.stepIdx > phase.steps.length - 1) {
      if (this.repeats++ > ((phase.repeats && phase.repeats + 1) || 0)) {
        this.phaseIdx++
      }
      this.stepIdx = 0
    }
    if (this.phaseIdx > this.phases.phases.length - 1) {
      // ALL DONE
      this.stop()
      return null
    }

    this.step = this.phases.phases[this.phaseIdx].steps[this.stepIdx]
    this.timer.start(this.step.time)

    this.nextup = this.peek()
    return this.step
  }
}

export class RunnerView {
  constructor(vnode) {
    this.runner = new Runner({
      phases: vnode.attrs.phases,
      onTick: this.onTick.bind(this),
      onComplete: this.onComplete.bind(this),
    })
    this.keys = vnode.attrs.keys
    this.running = vnode.attrs.running

    this.started = false

    this.keys.handlers.runner.onSpace = this.onSpace.bind(this)
    this.keys.handlers.runner.onEnter = this.onEnter.bind(this)
    this.keys.handlers.runner.onEsc = this.onEsc.bind(this)

    if (this.running) {
      this.runner.start()
    }
  }

  onTick() {
    const remaining = this.runner.timer.remaining()

    if (remaining <= 3) {
      beep()
    }
    m.redraw()
  }

  onComplete() {
    this.runner.next()
    beepDone()

    m.redraw()
  }

  onSpace(event) {
    event.preventDefault()
    this.runner.playPause()
    m.redraw()
  }

  onEnter() {
    this.runner.next()
    m.redraw()
  }

  onEsc() {
    this.runner.stop()
  }

  view() {
    let inner
    const runner = this.runner

    if (runner.finished) {
      inner = [
        m('h1.finished.title.is-size-1', { onclick: runner.stop }, 'DONE!'),
      ]
    } else {
      const btnType = runner.timer.isPaused() ? 'play' : 'pause'

      inner = [
        m('h1.runner-label.title.is-size-1', runner.step.label),
        m('h2.runner-timeleft.subtitle.is-size-2', runner.timer.remaining()),
        m('.runner-controls', [
          m(
            `button.button.is-dark.is-large.${btnType}-button`,
            { onclick: () => runner.playPause() },
            btnType
          ),
          m(
            'button.button.is-dark.is-large.next-button',
            { onclick: () => runner.next() },
            'next'
          ),
        ]),
      ]
    }

    const nextupTime = runner.nextup.time ? `${runner.nextup.time}s` : ''
    const nextupLabel = runner.nextup.label
      ? `next: ${runner.nextup.label} ${nextupTime}`
      : ''

    return m('section.runner.hero.is-dark.is-fullheight', [
      m('.hero-head', [
        m('.container', [m('h1.runner-progress.title', 'sup sup')]),
      ]),
      m('.hero-body', [m('.container.has-text-centered', inner)]),
      m('.hero-foot', [
        m('.container', [
          m(
            'h1.runner-nextup.title.is-pulled-right',
            { onclick: () => runner.next() },
            nextupLabel
          ),
        ]),
      ]),
    ])
  }
}
