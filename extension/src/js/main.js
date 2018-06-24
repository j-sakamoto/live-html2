import Vue from 'vue'
import App from './app'
import axios from "axios"
Vue.prototype.$axios = axios

let apps = []

const appendApp = (params) => {
  const { selector, dest, enabled } = params
  const targets = document.querySelectorAll(selector)

  if (!enabled) return;

  apps = Array.from(targets).map(target => {
    const app = document.createElement("div")
    app.setAttribute("class", "liveHtml2App")
    target.insertAdjacentElement("beforebegin", app)

    return new Vue({
      el: app,
      components: { App },
      render: function (h) {
        return h(App, {
          props: {
            target: target,
            dest: dest,
          },
          ref: "app"
        })
      },
    })
  })
}

const resetApp = (selector) => {
  apps.forEach(vue => {
    vue.$refs.app.resume()
    vue.$el.remove()
  })
  appendApp(selector)
}

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.resetApp) {
    resetApp(request.params)
  }
});

chrome.storage.sync.get(['selector', 'dest', 'enabled'], storage => {
  const params = {
    selector: storage.selector || "pre>code",
    dest: storage.dest || "pug",
    enabled: storage.enabled || true
  }
  appendApp(params)
})
