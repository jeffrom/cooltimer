import m from 'mithril'

import { BuilderView } from 'builder'
import { RunnerView } from 'runner'
import { Keys } from 'keys'

import defaultPhases from 'timer_templates/workout1'

class App {
  constructor() {
    this.keys = new Keys()
    this.keys.handlers.app.onSpace = this.onSpace.bind(this)
    this.keys.handlers.app.onEsc = this.onEsc.bind(this)
    this.reset()
  }

  reset() {
    this.phases = defaultPhases
    this.running = false
  }

  start() {
    this.running = true
  }

  onSpace(event) {
    event.preventDefault()
    if (!this.running) {
      this.start()
      m.redraw()
      return true
    }
    m.redraw()
    return false
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
        keys: this.keys,
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
