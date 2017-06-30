export default class Router {
  constructor(config) {
    if (!config || !config instanceof Array) {
      this.config = []
      return
    }
    this.config = config
  }
  go(path) {
    for (let i = 0; i < this.config.length; i++) {
      if (this.config[i].path === path) {
        this.render(this.config[i].component)
        break
      }
    }
  }
  change() {
    const hash = location.hash.split('#')[1]
    this.go(hash)
    
  }
  render(template) {
    document.querySelector('#app').innerHTML = template
  }
}