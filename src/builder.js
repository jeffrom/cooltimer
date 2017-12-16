import m from 'mithril'

import { LoaderView } from 'loader'
import { Phase, PhaseView } from 'builder/phase'
import { prettySeconds } from 'helpers'

class Builder {
  constructor(phases) {
    this.name = phases.name
    this.phases = phases.phases.map(phase => new Phase(phase))
  }

  totalDuration() {
    return this.phases.reduce((acc, phase) => acc + phase.totalDuration(), 0)
  }

  totalSteps() {
    return this.phases.reduce(
      (acc, phase) =>
        acc + phase.phase.steps.length * (phase.phase.repeats || 1),
      0
    )
  }
}

export class BuilderView {
  constructor(vnode) {
    this.builder = new Builder(vnode.attrs.phases)
    this.keys = vnode.attrs.keys
  }

  view() {
    return [
      m(LoaderView),
      m('.phase-info.hero.is-dark', [
        m('.container.is-fluid', [
          m('span.timer-name.title', this.builder.name),
          m('span', ' '),
          m('span.subtitle', prettySeconds(this.builder.totalDuration())),
          m('span', ' '),
          m('span.subtitle', `${this.builder.totalSteps()} steps`),
        ]),
      ]),
      m(
        '.phases',
        this.builder.phases.map(phase => m(PhaseView, { phase: phase }))
      ),
    ]
  }
}
