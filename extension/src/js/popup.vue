<template lang="pug">
div
  div
    span Selector:
    input(type="text" name="selector" v-model.lazy="selector" @change="onChangeSelector")
  div
    span Mode:
    input#pug(type="radio" value="pug" v-model="dest" @change="onChangeDest")
    label(for="pug") Pug
    input#haml(type="radio" value="haml" v-model="dest" @change="onChangeDest")
    label(for="haml") Haml
    input#slim(type="radio" value="slim" v-model="dest" @change="onChangeDest")
    label(for="slim") Slim
  div
    span Enabled:
    input#enabled(type="checkbox" v-model="enabled" @change="onChangeEnabled")
</template>

<script>

export default {
  name: "popup",
  props: {
    chrome: {
      type: Object,
      required: true
    },
    defaultSelector: {
      type: String,
      required: true,
    },
    defaultDest: {
      type: String,
      required: true,
    },
    defaultEnabled: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      selector: "pre",
      dest: "pug",
      enabled: true,
    }
  },
  mounted() {
    this.selector = this.defaultSelector
    this.dest = this.defaultDest
    this.enabled = this.defaultEnabled
    this.chrome.storage.sync.set({ selector: this.selector, dest: this.dest, enabled: this.enabled })
  },
  methods: {
    onChangeSelector(e) {
      this.selector = e.target.value
      this.chrome.storage.sync.set({ selector: this.selector })
      this.apply(e)
    },
    onChangeDest(e) {
      this.dest = e.target.value
      this.chrome.storage.sync.set({ dest: this.dest })
      this.apply(e)
    },
    onChangeEnabled(e) {
      this.enabled = e.target.checked
      this.chrome.storage.sync.set({ enabled: this.enabled })
      this.apply(e)
    },
    apply(e) {
      console.log(this.enabled);

      this.chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        this.chrome.tabs.sendMessage(
          tabs[0].id,
          { resetApp: true, params: { selector: this.selector, dest: this.dest, enabled: this.enabled } },
          response => null
        )
      })
    }
  },
}
</script>
