<template>
  <div v-if="item" class="menu-wrapper">
      <router-link v-if="item.child.length == 0" :to="item.menu_url">
          <el-menu-item :index="item.menu_url" :class="{'submenu-title-noDropdown':!isNest}">
           <i :class="'iconfont ' + item.icon"  ></i>
          <span slot="title">{{item.menu_name}}</span>
        </el-menu-item>
      </router-link>

       <el-submenu v-else :index="item.menu_url">
        <template slot="title">
          <i :class="'iconfont ' + item.icon"  ></i>
          <span v-if="item.menu_name" slot="title">{{item.menu_name}}</span>
        </template>

        <template v-for="child in item.child" >
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.child && child.child.length>0" :item="child" :key="child.mid" ></sidebar-item>

          <router-link v-else :to="resolvePath(child.menu_url)" :key="child.mid">
            <el-menu-item :index="resolvePath(child.menu_url)">
              <i :class="'iconfont ' + child.icon"  ></i>
              <span v-if="child.menu_name" slot="title">{{child.menu_name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
  </div>
</template>

<script>
import path from 'path'
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
        type: String,
        default: ''
        }
    },
    name: 'sidebarItem',
    data () {
      return {
      }
    },
    methods: {
        resolvePath (...paths) {
            return path.resolve(this.basePath, ...paths)
        }
    }
}
</script>
<style lang='scss' scoped>
</style>