import Vue from "vue"
import Popup from "./popup.vue"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

window.onload = () => {
  chrome.storage.sync.get(['selector', 'dest', 'enabled'], storage => {
    new Vue({
      el: "#popup",
      components: { Popup },
      render: function (h) {
        return h(Popup, {
          props: {
            chrome: chrome,
            defaultSelector: storage.selector || "pre>code",
            defaultDest: storage.dest || "pug",
            defaultEnabled: !(storage.enabled === false)
          }
        })
      },
    })
  })
}
