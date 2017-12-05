import m from 'mithril'

export class RunnerView {
  constructor(phases) {
    this.phases = phases
  }

  start() {
    console.log('start')
  }

  pause() {
    console.log('pause')
  }

  view() {
    return m('.runner', [
      m('.runner-label', 'its a label yo'),
      m('.runner-timeleft', '30'),
      m('.runner-controls', [
        m('button.pause-button', 'pause'),
        m('button.stop-button', 'stop'),
      ]),
    ])
  }
}
