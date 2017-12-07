import m from 'mithril'

export class StepView {
  constructor(vnode) {
    this.step = vnode.attrs.step
  }

  view() {
    const step = this.step

    return m('section.step.section', [
      m('.container.is-fluid', [
        m('span.step-interval', step.time),
        m('span', ' '),
        m('span.step-label.subtitle', step.label),
      ]),
    ])
  }
}
