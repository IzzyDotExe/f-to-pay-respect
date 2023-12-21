export class InputManager {

  constructor() {

    if (!!InputManager.instance) {
        return InputManager.instance;
    }

    this.keymap = {}
    InputManager.instance = this;

    return this;

  }

  addKeyHandler(key, event) {
    this.keymap[key] = event;
  }

  clearKeyHandler(key) {
    this.keymap[key] = () => {

    }
  }

  keyHandler(event) {
    
    var inst = new InputManager()

    if (!event.isTrusted)
      return false;

    if (Object.keys(inst.keymap).includes(event.key))
      inst.keymap[event.key](event);

  }

}