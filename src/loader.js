import m from 'mithril'

const req = require.context('./timer_templates', true, /\.js$/)

class Loader {
  constructor() {
    this.reload()
  }

  reload() {
    this.saves = []
    req.keys().forEach(mod => {
      const save = require('./timer_templates/' + mod.slice(2)).default

      this.saves.push(save)
    })
  }
}

export class LoaderView {
  constructor(vnode) {
    this.loader = new Loader()
  }

  view() {
    return m('.timer-loader.hero.is-dark', [
      m('.container.is-fluid', [
        m(
          'select.timer-loader-selector',
          this.loader.saves.map((save, i) => {
            return m('option.timer-loader-option', { value: i }, save.name)
          })
        ),
      ]),
    ])
  }
}
