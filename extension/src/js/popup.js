import Vue from "vue"
import Popup from "./popup.vue"

window.onload = () => {
  chrome.storage.sync.get(['selector', 'dest'], storage => {
    new Vue({
      el: "#popup",
      components: { Popup },
      render: function (h) {
        return h(Popup, {
          props: {
            chrome: chrome,
            defaultSelector: storage.selector || "pre>code",
            defaultDest: storage.dest || "pug",
            defaultEnabled: storage.enabled || true
          }
        })
      },
    })
  })
}
