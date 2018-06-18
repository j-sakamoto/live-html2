import Vue from 'vue'
import App from './app'
import axios from "axios"
Vue.prototype.$axios = axios

const appendApp = (params) => {
  const { selector, dest } = params
  const targets = document.querySelectorAll(selector)
  Array.from(targets).forEach(target => {
    const app = document.createElement("div")
    app.setAttribute("class", "liveHtml2App")
    target.insertAdjacentElement("beforebegin", app)

    new Vue({
      el: app,
      components: { App },
      render: function (h) {
        return h(App, {
          props: {
            target: target,
            dest: dest,
          }
        })
      },
    })
  })
}

const resetApp = (selector) => {
  document.querySelectorAll(".liveHtml2App").forEach(target => target.remove())
  appendApp(selector)
}

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.resetApp) {
    resetApp(request.params)
  }
});

chrome.storage.sync.get(['selector', 'dest'], storage => {
  const params = {
    selector: storage.selector || "pre",
    dest: storage.dest || "pug"
  }
  appendApp(params)
})
