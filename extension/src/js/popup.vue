<template lang="pug">
#popup
  el-form.form(ref='form' label-width='120px' size="mini" label-position="top")
    el-form-item(label='Selector')
      el-input(v-model="selector" @change="onChangeSelector")
    el-form-item(label='Mode')
      el-radio-group(v-model="dest" @change="onChangeDest")
        el-radio(label='pug')
        el-radio(label='haml')
        el-radio(label='slim')
    el-form-item(label='Enabled')
      el-switch(v-model="enabled" @change="onChangeEnabled")
  .version LiveHtml2 v.{{ chrome.app.getDetails().version }}
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
      this.chrome.storage.sync.set({ selector: this.selector })
      this.apply(e)
    },
    onChangeDest(e) {
      this.chrome.storage.sync.set({ dest: this.dest })
      this.apply(e)
    },
    onChangeEnabled(e) {
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

<style lang="sass" scoped>
#popup
  width: 260px;
  padding: 5px 20px;
  .version
    text-align: right
    color: #333
</style>
