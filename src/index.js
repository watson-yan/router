import Router from './Router.js'
import RouterConfig from './routerConfig'

window.onload = () => {
  const router = new Router(RouterConfig)
  if ('onhashchange' in window) {
    window.addEventListener('hashchange', () => {
      router.change()
    })
  }
  +function pushUrl(url) {
    history.pushState(null, 'title', url)
    router.go(url)
  }
}
