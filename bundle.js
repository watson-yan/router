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
    const host = location.host;
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
  if ('onhashchange' in window) {
    window.addEventListener('hashchange', () => {
      router$$1.change();
    });
  }
  +function pushUrl(url) {
    history.pushState(null, 'title', url);
    router$$1.go(url);
  };
};

})));
