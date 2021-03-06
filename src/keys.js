export class Keys {
  constructor() {
    this.setup()
    this.handlers = {
      app: {},
      builder: {},
      runner: {},
    }
  }

  setup() {
    document.addEventListener('keydown', this.keydown.bind(this))
    // document.addEventListener('keyup', this.keyup.bind(this))
  }

  runHandlers(name, event) {
    let broke

    Object.keys(this.handlers).map(module => {
      if (broke) {
        return
      }

      if (this.handlers[module][name]) {
        if (this.handlers[module][name](event)) {
          broke = true
        }
      }
    })
  }

  keydown(event) {
    // console.log('keydown', event.keyCode)
    switch (event.keyCode) {
      case 13:
        this.runHandlers('onEnter', event)
        break
      case 27:
        this.runHandlers('onEsc', event)
        break
      case 32:
        this.runHandlers('onSpace', event)
        break
    }
  }

  // keyup(event) {
  //   console.log('keyup', event.keyCode)
  // }

  // onSpace(event) {}
}
