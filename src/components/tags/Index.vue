<template>
  <!-- <div class="tags">
    <Tag type="dot"
      v-for="(item, index) in tags"
      :key="item.name"
      :closable="item.name === 'home' ? false : true"
      :color="item.name === $route.name ? 'primary' : 'default'"
      @click.native="linkTo(item.url)"
      @on-close="handleClose(index, item.name)"
      >{{item.title}}</Tag>
  </div> -->
  <div class="tags-nav">
    <div class="close-con">
      <Dropdown transfer @on-click="handleTagsOption" style="margin-top:7px;">
        <Button size="small" type="text">
          <Icon :size="18" type="ios-close-circle-outline" />
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="close-all">关闭所有</DropdownItem>
          <DropdownItem name="close-others">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <!-- <ul v-show="visible" :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}" class="contextmenu">
      <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{item}}</li>
    </ul> -->
    <div class="btn-con left-btn">
      <Button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back" />
      </Button>
    </div>
    <div class="btn-con right-btn">
      <Button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
    </div>
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
          <Tag type="dot"
            v-for="(item, index) in tags"
            :key="item.name"
            :closable="item.name === 'home' ? false : true"
            :color="item.name === $route.name ? 'primary' : 'default'"
            @click.native="linkTo(item.url)"
            @on-close="handleClose(index, item.name)"
            >{{item.title}}</Tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      visible: false,
      menuList: {
        others: '关闭其他',
        all: '关闭所有'
      }
    }
  },
  computed: {
    tags () {
      return JSON.parse(this.$store.state.tags)
    },
    currentRouteObj () {
      const { name, params, query } = this.value
      return { name, params, query }
    }
  },
  methods: {
    handlescroll (e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll (offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    handleTagsOption (type) {
      let tags = [{
        name: "home",
        title: "首页",
        url: "/"
      }]
      if (type.includes('all')) {
        // 关闭所有，除了home
        this.$store.commit('TAG', JSON.stringify(tags))
        this.$router.push('/')
      } else if (type.includes('others')) {
        // 关闭除当前页和home页的其他页
        if (this.$route.name !== 'home') {
          let res = {
            name: this.$route.name,
            title: this.$route.meta.title,
            url: this.$route.path
          }
          tags.push(res)
        }
        this.$store.commit('TAG', JSON.stringify(tags))
      }
    },
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
.no-select{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.size{
  width: 100%;
  height: 100%;
}
.tags-nav{
  position: relative;
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
  height: 40px;
  // .no-select;
  // .size;
  .close-con{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    text-align: center;
    z-index: 10;
  }
  .btn-con{
    position: absolute;
    top: 0px;
    height: 100%;
    background: #fff;
    padding-top: 3px;
    z-index: 10;
    button{
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    }
    &.left-btn{
      left: 0px;
    }
    &.right-btn{
      right: 32px;
      border-right: 1px solid #F0F0F0;
    }
  }
  .scroll-outer{
    position: absolute;
    left: 28px;
    right: 61px;
    top: 0;
    bottom: 0;
    box-shadow: 0px 0 3px 2px rgba(100,100,100,.1) inset;
    .scroll-body{
      height: calc(100% - 1px);
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left .3s ease;
      .ivu-tag-dot-inner{
        transition: background .2s ease;
      }
    }
  }
  .contextmenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: #fff;
    z-index: 100;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 5px 15px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}

</style>
