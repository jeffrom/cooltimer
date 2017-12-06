import m from 'mithril'

import { BuilderView } from 'builder'
import { RunnerView } from 'runner'

class App {
  constructor() {
    this.reset()
  }

  reset() {
    if (this.runner) {
      this.runner.runner.stop()
    }
    this.builder = new BuilderView()
    this.runner = new RunnerView(this.builder.phases)
    this.running = false
  }

  start() {
    this.running = true
    this.runner.runner.start()
  }

  view() {
    // console.log('app.view()', this)
    return m('main', [
      m(this.running ? this.runner : this.builder),
      m('.controls-container', [
        m('button.start-button', { onclick: this.start.bind(this) }, 'start'),
        m('button.stop-button', { onclick: this.reset.bind(this) }, 'stop'),
      ]),
    ])
  }
}

m.mount(document.body, new App())
