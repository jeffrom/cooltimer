import m from 'mithril'

import { BuilderView } from 'builder'
import { RunnerView } from 'runner'
import { Keys } from 'keys'

const req = require.context('./timer_templates', true, /\.js$/)

class App {
  constructor() {
    this.keys = new Keys()
    this.keys.handlers.app.onSpace = this.onSpace.bind(this)
    this.keys.handlers.app.onEsc = this.onEsc.bind(this)
    this.reset()
  }

  reset() {
    this.saves = req
      .keys()
      .map(mod => require('./timer_templates/' + mod.slice(2)).default)
    this.saveIdx = 0
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
    let loaderView = []

    if (!this.running) {
      loaderView = m('.timer-loader.hero.is-dark', [
        m('.container.is-fluid', [
          m(
            'select.timer-loader-selector',
            {
              onchange: m.withAttr('value', val => {
                this.saveIdx = val
              }),
            },
            this.saves.map((save, i) => {
              return m('option.timer-loader-option', { value: i }, save.name)
            })
          ),
        ]),
      ])
    }

    return m('main', [
      loaderView,
      m(this.running ? RunnerView : BuilderView, {
        saveIdx: this.saveIdx,
        running: this.running,
        saves: this.saves,
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
