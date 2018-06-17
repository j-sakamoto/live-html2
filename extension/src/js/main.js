import Vue from 'vue'
import App from './app'
import axios from "axios"
Vue.prototype.$axios = axios

const appendApp = (selector) => {
  const targets = document.querySelectorAll(selector)
  Array.from(targets).forEach(target => {
    const app = document.createElement("div")
    app.setAttribute("class", "liveHtml2App")
    target.insertAdjacentElement("beforebegin", app)

    console.log(selector);
    new Vue({
      el: app,
      components: { App },
      render: function (h) {
        return h(App, {
          props: {
            target: target
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
    resetApp(request.selector)
  }
});

chrome.storage.sync.get(['selector'], storage => {
  const defaultSelector = storage.selector || "pre"
  appendApp(defaultSelector)
})
