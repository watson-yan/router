(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

class Router {
  constructor(config) {
    if (!config || !config instanceof Array) {
      this.config = [];
      return
    }
    this.config = config;
  }
  go(path) {
    for (let i = 0; i < this.config.length; i++) {
      if (this.config[i].path === path) {
        this.render(this.config[i].component);
        break
      }
    }
  }
  change() {
    const hash = location.hash.split('#')[1];
    // const host = location.host
    // history.pushState(null, '', hash)
    this.go(hash);
    
  }
  render(template) {
    document.querySelector('#app').innerHTML = template;
  }
}

const router = [
  {
    path: '/a',
    component: `<span>这里是PageA</span>`
  },
  {
    path: '/b',
    component: `<span>这里是PageB</span>`
  },
  {
    path: '/c',
    component: `<span>这里是PageC</span>`
  }
];

window.onload = () => {
  const router$$1 = new Router(router);
  // hash模式
  if ('onhashchange' in window) {
    window.addEventListener('hashchange', () => {
      router$$1.change();
    });
  }
  // history 模式
  if(window.history && window.history.pushState) {
    if (location.href !== location.host) {
      const linkBtns = document.querySelectorAll('.router-link');
      linkBtns.forEach((ele) => {
        ele.addEventListener('click', () => {
          const toUrl = ele.dataset.url;
          history.pushState(null, '', toUrl);
          router$$1.go(toUrl);
        });
      });
    }
    // window.addEventListener('popstate', () => {alert('1')})
    window.addEventListener('popstate', () => {
      console.warn('popstate');
      const url = location.href.replace(`${location.protocol}//${location.host}`, '');
      // console.log(url)
      router$$1.go(url);
    });
  }
};

})));
