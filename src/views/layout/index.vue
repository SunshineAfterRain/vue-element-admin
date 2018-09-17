<template>
  <div>
      <div class="app-wrapper">
          <nav-bar></nav-bar>
          <side-bar class="sidebar-container"></side-bar>
          <div class="main-container">
              <tags-view></tags-view>
              <app-main></app-main>
          </div>
      </div>
  </div>
</template>

<script>
import {AppMain, NavBar, SideBar, TagsView} from '@/components/Layout'
export default {
  components: {
    AppMain,
    NavBar,
    SideBar,
    TagsView
  },
  name: 'Layout',
  data () {
    return {
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
