<template>
  <div class="tags">
    <Tag type="dot"
      v-for="(item, index) in tags"
      :key="item.name"
      :closable="item.name === 'home' ? false : true"
      :color="item.name === $route.name ? 'primary' : 'default'"
      @click.native="linkTo(item.url)"
      @on-close="handleClose(index, item.name)"
      >{{item.title}}</Tag>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    tags () {
      return JSON.parse(this.$store.state.tags)
    }
  },
  methods: {
    handleClose (index, name) {
      this.tags.splice(index, 1)
      if (name === this.$route.name) {
        let url = this.tags[this.tags.length - 1].url
        this.$router.push(url)
      }
      this.$store.commit('TAG', JSON.stringify(this.tags))
    },
    linkTo (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags{
  display: flex;
  padding: 5px 10px;
  box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1)
}
.ivu-tag-green{
  line-height: 32px;
}
</style>
