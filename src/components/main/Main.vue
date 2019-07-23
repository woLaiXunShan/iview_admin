<template>
  <div class="layout">
    <Layout style="height: 100vh;">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <div class="logo">LOGO</div>
        <Menu v-show="!isCollapsed" :active-name="$route.name" theme="dark" width="auto" :class="menuitemClasses">
          <template v-for="(item, index) in routes">
            <Submenu :name="index" v-if="item.name!=='home_' && item.name!=='login'" :key="index" :index="`${index}`">
              <template slot="title">
                <Icon :type="item.meta.icon"/>
                {{item.meta.title}}
              </template>
              <MenuItem v-for="(it, i) in item.children" :name="`${index}-${i}`" :key="`${index}-${i}`">
                <router-link :to="it.path">
                  {{it.meta.title}}
                </router-link>
              </MenuItem>
            </Submenu>
          </template>
        </Menu>
        <div class="menu-collapsed" v-show="isCollapsed" :list="routes">
          <template v-for="item in routes">
            <Dropdown v-if="item.name!=='home_' && item.name!=='login'" :key="item.name">
              <a href="javascript:void(0)">
                <Icon :type="item.meta.icon"/>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem v-for="(it, i) in item.children" :name="`-${i}`" :key="`-${i}`">
                  <router-link :to="it.path">
                    {{it.meta.title}}
                  </router-link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </div>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <div class="header_user_nav">
            <Icon
              @click.native="collapsedSider"
              :class="rotateIcon"
              :style="{margin: '0 20px'}"
              type="md-menu"
              size="28"
              style="cursor:pointer;"
            ></Icon>
            <Breadcrumb></Breadcrumb>
          </div>
          <div class="header_user_msg">
            <Dropdown @on-click="out_($event)">
              <Avatar :src="head" />
              <DropdownMenu slot="list">
                <!-- <DropdownItem name="my">个人中心</DropdownItem> -->
                <DropdownItem name="out">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <Tags></Tags>
        <Content :style="{margin: '10px',padding: '10px', background: '#fff', minHeight: '260px'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Breadcrumb from '@/components/breadcrumb/Index.vue'
import Tags from '@/components/tags/Index.vue'
import head from '@img/logo.png'
export default {
  components: {
    Breadcrumb, Tags
  },
  data() {
    return {
      isCollapsed: false,
      head
    }
  },
  computed: {
    routes () {
      return this.$router.options.routes
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""]
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""]
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse()
    },
    out_ (name) {
      console.log(name)
      if (name === 'out') {
        sessionStorage.login = false
        sessionStorage.tags = []
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style scoped>
.logo{
  height: 64px;
  line-height: 64px;
  text-align: center;
  color: #fff;
  font-size: 24px;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header_user_msg{
  padding-right: 20px;
}
.header_user_nav{
  display: flex;
  align-items: center;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
