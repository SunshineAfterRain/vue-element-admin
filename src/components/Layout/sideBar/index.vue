<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      background-color="#FFFFFF"
      text-color="#505050"
      active-text-color="#2A7FFF"
    >
      <sidebar-item v-for="route in menuList" :key="route.mid" :item="route" ></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { fetchMenuList } from '@/api/common'
import sidebarItem from './sideBarItem.vue'

  export default {
    name: 'SideBar',
    components: {
      sidebarItem
    },
    data () {
      return {
          menuList: []
      }
   },
   methods: {
       async getMenu () {
           this.menuList = await fetchMenuList()
       }
   },
   created () {
     this.getMenu()
   }
}

</script>
<style lang='scss' scoped>
</style>
