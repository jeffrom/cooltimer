import m from 'mithril'

import { BuilderView } from 'builder'
import { RunnerView } from 'runner'

const root = document.body

class App {
  constructor() {
    this.builder = new BuilderView()
    this.runner = new RunnerView(this.builder.phases)
    this.running = false
  }

  start() {
    console.log('starting')
    this.running = true
    this.runner.start()
  }

  stop() {
    this.running = false
  }

  view() {
    let inner

    if (this.running) {
      inner = m(this.runner)
    } else {
      inner = [
        m('h1', { class: 'title' }, 'cool timer'),
        m('.builder-container', m(this.builder)),
        m('.controls-container', [
          m('button.start-button', { onclick: this.start.bind(this) }, 'start'),
        ]),
      ]
    }

    return m('main', inner)
  }
}

m.mount(root, new App())
