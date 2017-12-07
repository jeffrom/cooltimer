import m from 'mithril'

import { StepView } from 'builder/step'
import { prettySeconds } from 'helpers'

export class PhaseView {
  constructor(vnode) {
    this.phase = vnode.attrs.phase
    this.steps = this.phase.phase.steps.map(step => m(StepView, { step: step }))
  }

  view() {
    const phase = this.phase

    return m('section.phase.hero.is-dark', [
      m('.container.is-fluid', [
        m('span.phase-label.subtitle', phase.phase.label),
        m('span', ' '),
        m('span.repeats', phase.numRepeats()),
        m('span', ' x '),
        m('span.phase-num-steps', phase.numSteps()),
        m('span', ' '),
        m('span.duration', prettySeconds(phase.totalDuration())),
        m('.steps', this.steps),
      ]),
    ])
  }
}
