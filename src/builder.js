import m from 'mithril'

import { PhaseView } from 'builder/phase'
import { prettySeconds } from 'helpers'

class Phase {
  constructor(phase) {
    this.phase = phase
  }

  totalDuration() {
    const phase = this.phase

    return (
      this.numRepeats() * phase.steps.reduce((acc, step) => acc + step.time, 0)
    )
  }

  numRepeats() {
    return this.phase.repeats || 1
  }

  numSteps() {
    return this.phase.steps.length
  }

  totalSteps() {
    return this.numSteps() * this.numRepeats()
  }
}

class Builder {
  constructor(phases) {
    this.name = phases.name
    this.phases = phases.phases.map(phase => new Phase(phase))
  }

  totalDuration() {
    return this.phases.reduce((acc, phase) => acc + phase.totalDuration(), 0)
  }
}

export class BuilderView {
  constructor(vnode) {
    this.builder = new Builder(vnode.attrs.phases)
    this.keys = vnode.attrs.keys
  }

  view() {
    return [
      m('.phase-info.hero.is-dark', [
        m('.container.is-fluid', [
          m('span.timer-name.title', this.builder.name),
          m('span', ' '),
          m(
            'span.phase-steps.subtitle',
            prettySeconds(this.builder.totalDuration())
          ),
        ]),
      ]),
      m(
        '.phases',
        this.builder.phases.map(phase => m(PhaseView, { phase: phase }))
      ),
    ]
  }
}
