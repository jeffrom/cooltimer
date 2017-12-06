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
    repeats: 3,
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

class StepView {
  constructor(step) {
    this.step = step
  }

  view() {
    const step = this.step

    return m(
      'section.step.section',
      // { style: `background-color:${step.color}` },
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

function prettySeconds(s) {
  if (s > 60) {
    const minutes = Math.floor(s / 60)
    const remainingSecs = s % 60
    const secs = remainingSecs ? `${remainingSecs}s` : ''
    return `${minutes}m${secs}`
  }
  return `${s}s`
}

class PhaseView {
  constructor(phase) {
    this.phase = phase
  }

  view() {
    const phase = this.phase
    const totalDuration =
      (phase.repeats || 1) *
      phase.steps.reduce((acc, step) => {
        return acc + step.time
      }, 0)

    return m('section.phase.hero.is-dark', [
      m('.container.is-fluid', [
        m('span.phase-label.title', phase.label),
        m('span', ' '),
        m('span.repeats', phase.repeats || 1),
        m('span', ' x '),
        m('span.phase-num-steps', phase.steps.length),
        m('span', ' '),
        m('span.duration', prettySeconds(totalDuration)),
        m('.steps', phase.steps.map(step => m(new StepView(step)))),
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
      m('.phases', this.phases.map(phase => m(new PhaseView(phase)))),
    ]
  }
}
