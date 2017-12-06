import m from 'mithril'

const defaultPhases = [
  {
    label: 'Warm up',
    steps: [
      { color: '#ebf441', label: 'Jumping Jacks', time: 30 },
      { color: '#f4a641', label: 'Boxer shuffle', time: 30 },
    ],
  },

  // phase 1
  {
    label: 'phase 1',
    steps: [
      { color: '#6ef442', label: 'Burpee', time: 30 },
      { color: '#f44741', label: 'Rest', time: 10 },
      { color: '#6ef442', label: 'Mountain Climbers', time: 30 },
      { color: '#f44741', label: 'Rest', time: 10 },
      { color: '#6ef442', label: 'Plank', time: 30 },
      { color: '#f44741', label: 'Rest', time: 10 },
    ],
  },
]

class Step {
  constructor(step) {
    this.step = step
  }

  view() {
    const step = this.step

    return m(
      'section.step.section',
      { style: `background-color:${step.color}` },
      [
        m('.container.is-fluid', [
          m('span.step-interval', step.time),
          m('span', ' '),
          m('span.step-label.subtitle', step.label),
        ]),
      ]
    )
  }
}

class Phase {
  constructor(phase) {
    this.phase = phase
  }

  view() {
    const phase = this.phase

    return m('section.phase.section', [
      m('.container.is-fluid', [
        m('h1.phase-label.title', `${phase.label} (${phase.steps.length})`),
        m('.steps', phase.steps.map(step => m(new Step(step)))),
      ]),
    ])
  }
}

export class BuilderView {
  constructor(phases = defaultPhases) {
    this.phases = phases
  }

  view() {
    return [
      m('.step-controls', []),
      m('.phases', this.phases.map(phase => m(new Phase(phase)))),
    ]
  }
}
