export default {
  mounted () {
    let { title } = this.$options
    if (title) {
      document.title = typeof title === 'function' ? title.call(this) : title
    }
  }
}
