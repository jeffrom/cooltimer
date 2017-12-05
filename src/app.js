import m from 'mithril'

const root = document.body

class App {
  view() {
    return m('main', [m('h1', { class: 'title' }, 'cool app')])
  }
}

m.render(root, new App())
