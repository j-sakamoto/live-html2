<template lang="pug">
.liveHtml2App(@click="handleConvert")
  span {{ isConverted ? "resume":`liveHtml2${dest}` }}
</template>

<script>
export default {
  name: "app",
  props: {
    target: {
      type: HTMLElement,
      required: true
    },
    dest: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isConverted: false,
      defaultHtml: ""
    }
  },
  beforeMount() {
    this.defaultHtml = this.target.innerHTML
  },
  methods: {
    handleConvert(e) {
      if (this.isConverted)
        this.resume()
      else
        this.convert()
    },
    convert() {
      const endpoint = process.env.ENDPOINT || "http://localhost:3000/transcode"
      const params = {
        html: String(this.target.innerText),
        dest: this.dest
      }
      this.$axios.post(endpoint, params)
        .then(res => {
          this.target.innerText = res.data.result
          this.isConverted = true
        })
    },
    resume() {
      this.target.innerHTML = this.defaultHtml
      this.isConverted = false
    }
  },
}
</script>

<style lang="sass" module>
.liveHtml2App
  display: table
  box-sizing: border-box
  border-radius: 10px
  margin: 0
  padding: 2px 5px
  background: orange
  box-shadow: 0 2px 8px gray
  z-index: 9999
  &:hover
    opacity(0.3)
  span
    font-size: 12px
    color: white
    font-weight: bold
</style>
