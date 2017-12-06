export class Keys {
  constructor() {
    this.setup()
  }

  setup() {
    document.addEventListener('keydown', this.keydown.bind(this))
    // document.addEventListener('keyup', this.keyup.bind(this))
  }

  keydown(event) {
    // console.log('keydown', event.keyCode)
    switch (event.keyCode) {
      case 13:
        this.onEnter(event)
        break
      case 27:
        this.onEsc(event)
        break
      case 32:
        this.onSpace(event)
        break
    }
  }

  // keyup(event) {
  //   console.log('keyup', event.keyCode)
  // }

  // onSpace(event) {}
}
