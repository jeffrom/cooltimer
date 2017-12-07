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
