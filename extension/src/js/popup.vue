<template lang="pug">
div
  div
    label Selector:
      input(type="text" name="selector" v-model.lazy="selector" @change="onChangeSelector")
  div
    span Destinate Template:
    input#pug(type="radio" value="pug" v-model="dest" @change="onChangeDest")
    label(for="pug") Pug
    input#haml(type="radio" value="haml" v-model="dest" @change="onChangeDest")
    label(for="haml") Haml
    input#slim(type="radio" value="slim" v-model="dest" @change="onChangeDest")
    label(for="slim") Slim
  div
    button(@click.prevent="handleSubmit" ) Convert Html2{{dest}}
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
    }
  },
  data() {
    return {
      selector: "pre",
      dest: "pug",
    }
  },
  mounted() {
    this.selector = this.defaultSelector
    this.dest = this.defaultDest
    this.chrome.storage.sync.set({ selector: this.selector, dest: this.dest })
  },
  methods: {
    onChangeSelector(e) {
      this.selector = e.target.value
      this.chrome.storage.sync.set({ selector: this.selector })
    },
    onChangeDest(e) {
      this.dest = e.target.value
      this.chrome.storage.sync.set({ dest: this.dest })
    },
    handleSubmit(e) {
      this.chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        this.chrome.tabs.sendMessage(
          tabs[0].id,
          { resetApp: true, params: { selector: this.selector, dest: this.dest } },
          response => null
        )
      })
    }
  },
}
</script>
