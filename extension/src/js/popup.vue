<template lang="pug">
div
  div
    label Selector:
      input(type="text" name="selector" v-model.lazy="selector" @change="onChangeSelector")
  button(@click.prevent="handleSubmit" ) Convert Html2Pug
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
    }
  },
  data() {
    return {
      selector: "pre"
    }
  },
  beforeMount() {
    this.selector = this.defaultSelector
  },
  methods: {
    onChangeSelector(e) {
      this.selector = e.target.value
      this.chrome.storage.sync.set({ selector: this.selector })
    },
    handleSubmit(e) {
      this.chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        this.chrome.tabs.sendMessage(
          tabs[0].id,
          { resetApp: true, selector: this.selector },
          response => null
        )
      })
    }
  },
}
</script>
