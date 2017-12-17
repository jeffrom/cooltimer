import m from 'mithril'

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
  constructor() {}

  view(vnode) {
    const attrs = vnode.attrs
    const builder = new Builder(attrs.saves[attrs.saveIdx])

    return [
      m('.phase-info.hero.is-dark', [
        m('.container.is-fluid', [
          m('span.timer-name.title', builder.name),
          m('span', ' '),
          m('span.subtitle', prettySeconds(builder.totalDuration())),
          m('span', ' '),
          m('span.subtitle', `${builder.totalSteps()} steps`),
        ]),
      ]),
      m('.phases', builder.phases.map(phase => m(PhaseView, { phase: phase }))),
    ]
  }
}
