import m from 'mithril'

const defaultPhases = {
  name: 'normal workout',
  phases: [
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
  ],
}

class StepView {
  constructor(step) {
    this.step = step
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

function prettySeconds(s) {
  if (s > 60) {
    const minutes = Math.floor(s / 60)
    const remainingSecs = s % 60
    const secs = remainingSecs ? `${remainingSecs}s` : ''

    return `${minutes}m${secs}`
  }
  return `${s}s`
}

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
}

class PhaseView {
  constructor(phase) {
    this.phase = phase
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
        m('.steps', phase.phase.steps.map(step => m(new StepView(step)))),
      ]),
    ])
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
  constructor(phases = defaultPhases) {
    this.builder = new Builder(phases)
  }

  view() {
    return [
      m('.step-controls', []),
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
      m('.phases', this.builder.phases.map(phase => m(new PhaseView(phase)))),
    ]
  }
}
