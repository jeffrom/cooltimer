import m from 'mithril'

import { BuilderView } from 'builder'
import { RunnerView } from 'runner'

class App {
  constructor() {
    this.builder = new BuilderView()
    // this.runner = new RunnerView(this.builder.phases, this.stop.bind(this))
    this.runner = new RunnerView(this.builder.phases, this.stop.bind(this))
    this.running = false
  }

  start() {
    console.log('starting')
    this.running = true
    this.runner.runner.start()
  }

  stop() {
    console.log('App.stop()', this)
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

    console.log('app.view()', this)
    return m('main', inner)
  }
}

m.mount(document.body, new App())
