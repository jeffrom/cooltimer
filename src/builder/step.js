import m from 'mithril'

import { hexToRGB, invertColor } from 'helpers'

export class StepView {
  constructor(vnode) {
    this.step = vnode.attrs.step
  }

  view() {
    const step = this.step
    let attrs = {}

    if (step.color) {
      const rgb = hexToRGB(step.color)
      const inverted = invertColor(rgb)
      const style = `background:${step.color};color:${inverted};`

      attrs = { style: style }
    }

    return m('section.step.section', attrs, [
      m('.container.is-fluid', [
        m('span.step-interval', step.time),
        m('span', ' '),
        m('span.step-label', step.label),
      ]),
    ])
  }
}
