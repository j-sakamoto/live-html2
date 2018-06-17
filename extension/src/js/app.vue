<template lang="pug">
.liveHtml2App(@click="handleConvert")
  span {{ isConverted ? "converted":"liveHtml2" }}
</template>

<script>
const endpoint = process.env.endpoint ? "http://localhost:3000/" : ""
export default {
  name: "app",
  props: {
    target: {
      type: HTMLElement,
      required: true
    }
  },
  data() {
    return {
      isConverted: false,
    }
  },
  components: {
  },
  methods: {
    handleConvert(e) {
      if (!this.isConverted) this.convert();
    },
    convert() {
      const params = {
        html: String(this.target.innerText)
      }
      this.$axios.post("http://localhost:3000/transcode", params)
        .then(res => {
          this.target.innerText = res.data.result
          this.isConverted = true
        })
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
