import m from 'mithril'

const defaultPhases = {
  name: 'normal workout',
  phases: [
    {
      label: 'Warm up',
      steps: [
        { label: 'arm circle steps', time: 30 },
        { label: 'high knee march', time: 30 },
        { color: '#ebf441', label: 'Jumping Jacks', time: 30 },
        { label: 'up and outs', time: 30 },
        { color: '#f4a641', label: 'Boxer shuffle', time: 30 },
      ],
    },

    {
      label: 'get ready',
      steps: [{ label: 'get ready', time: 30 }],
    },

    {
      label: 'phase 1',
      repeats: 3,
      steps: [
        { color: '#6ef442', label: 'Burpee', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'Mountain Climbers', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'Lunges', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'arch ups', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'squat', time: 30 },
        { color: '#f44741', label: 'Rest', time: 30 },
      ],
    },

    {
      label: 'Water Break',
      steps: [{ label: 'Rest', time: 30 }],
    },

    {
      label: 'phase 2',
      repeats: 3,
      steps: [
        { label: 'monkey walks', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { label: 'rotating planks', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { label: 'pike pushups', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { label: 'pushups', time: 30 },
        { color: '#f44741', label: 'Rest', time: 30 },
      ],
    },

    {
      label: 'Water Break',
      steps: [{ label: 'Rest', time: 60 }],
    },

    {
      label: 'phase 3',
      repeats: 3,
      steps: [
        { label: 'Plank', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { label: 'Side Plank', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { label: 'Side Plank Alt', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { label: 'Back Plank', time: 30 },
        { color: '#f44741', label: 'Rest', time: 30 },
      ],
    },

    {
      label: 'cool down',
      steps: [
        { label: 'inner thigh reachovers', time: 30 },
        { label: 'inner thigh reachovers alt', time: 30 },
        { label: 'quad stretch', time: 30 },
        { label: 'quad stretch alt', time: 30 },
        { label: 'hamstring stretch', time: 30 },
        { label: 'calf stretch', time: 30 },
        { label: 'calf stretch alt', time: 30 },
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

  totalSteps() {
    return this.numSteps() * this.numRepeats()
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
