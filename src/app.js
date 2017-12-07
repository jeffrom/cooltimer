import m from 'mithril'

import { BuilderView } from 'builder'
import { RunnerView } from 'runner'
import { Keys } from 'keys'

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

class App {
  constructor() {
    this.keys = new Keys()
    this.keys.onSpace = this.onSpace.bind(this)
    this.keys.onEnter = this.onEnter.bind(this)
    this.keys.onEsc = this.onEsc.bind(this)
    this.reset()
  }

  reset() {
    if (this.runner) {
      this.runner.runner.stop()
    }
    this.phases = defaultPhases
    // this.builder = new BuilderView()
    // this.runner = new RunnerView(this.builder.builder.phases)
    this.running = false
  }

  start() {
    this.running = true
    // this.runner.runner.start()
  }

  onSpace(event) {
    event.preventDefault()
    if (this.running) {
      this.runner.runner.playPause()
    } else {
      this.start()
    }
    m.redraw()
  }

  onEnter() {
    this.runner.runner.next()
    m.redraw()
  }

  onEsc() {
    if (this.running) {
      this.reset()
    }
    m.redraw()
  }

  view() {
    return m('main', [
      m(this.running ? RunnerView : BuilderView, {
        running: this.running,
        phases: this.phases,
      }),
      m('section.app-controls.hero.is-dark', [
        m('.container.is-fluid', [
          m(
            'button.button.is-large.is-dark.start-button',
            { onclick: this.start.bind(this), disabled: this.running },
            'start'
          ),
          m(
            'button.button.is-large.is-dark.stop-button',
            { onclick: this.reset.bind(this), disabled: !this.running },
            'stop'
          ),
        ]),
      ]),
    ])
  }
}

m.mount(document.body, new App())
