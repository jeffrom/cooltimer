import m from 'mithril'

import { BuilderView } from 'builder'

const root = document.body

class App {
  view() {
    return m('main', [
      m('h1', { class: 'title' }, 'cool timer'),
      m('.builder-container', m(new BuilderView())),
      m('.controls-container', [m('button.start-button', 'start')])
    ])
  }
}

m.mount(root, new App())
