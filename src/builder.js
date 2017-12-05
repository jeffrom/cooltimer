import m from 'mithril'

const defaultPhases = [
  {
    label: 'Warm up',
    steps: [
      { color: 'yellow', label: 'Jumping Jacks', time: 30 },
      { color: 'orange', label: 'Boxer shuffle', time: 30 },
    ],
  },

  // phase 1
  {
    label: 'phase 1',
    steps: [
      { color: 'green', label: 'Burpee', time: 30 },
      { color: 'red', label: 'Rest', time: 10 },
      { color: 'green', label: 'Mountain Climbers', time: 30 },
      { color: 'red', label: 'Rest', time: 10 },
      { color: 'green', label: 'Plank', time: 30 },
      { color: 'red', label: 'Rest', time: 10 },
    ],
  },
]

export class BuilderView {
  constructor(phases = defaultPhases) {
    this.phases = phases
  }

  view() {
    return [
      m('.step-controls', []),
      m(
        '.phases',
        this.phases.map(phase => {
          return m('.phase', [
            m('.phase-label', `${phase.label} (${phase.steps.length})`),
            m(
              '.steps',
              phase.steps.map(step => {
                return m('.step', { style: `background-color:${step.color}` }, [
                  m('.step-interval', step.time),
                  m('.step-label', step.label),
                ])
              })
            ),
          ])
        })
      ),
    ]
  }
}
