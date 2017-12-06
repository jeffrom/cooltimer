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
    this.runner = new RunnerView(this.builder.builder.phases)
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
