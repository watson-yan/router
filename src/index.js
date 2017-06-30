import Router from './Router.js'
import RouterConfig from './routerConfig'

window.onload = () => {
  const router = new Router(RouterConfig)
  
  // hash模式
  if ('onhashchange' in window) {
    window.addEventListener('hashchange', () => {
      router.change()
    })
  }
  // history 模式
  if(window.history && window.history.pushState) {
    if (location.href !== location.host) {
      const linkBtns = document.querySelectorAll('.router-link')
      linkBtns.forEach((ele) => {
        ele.addEventListener('click', () => {
          const toUrl = ele.dataset.url
          history.pushState(null, '', toUrl)
          router.go(toUrl)
        })
      })
    }

    window.addEventListener('popstate', () => {
      console.warn('popstate')
      const url = location.href.replace(`${location.protocol}//${location.host}`, '')
      // console.log(url)
      router.go(url)
    })
  }
}
