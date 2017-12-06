import m from 'mithril'

import { BuilderView } from 'builder'
import { RunnerView } from 'runner'
import { Keys } from 'keys'

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
    this.builder = new BuilderView()
    this.runner = new RunnerView(this.builder.builder.phases)
    this.running = false
  }

  start() {
    this.running = true
    this.runner.runner.start()
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
      m(this.running ? this.runner : this.builder),
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
