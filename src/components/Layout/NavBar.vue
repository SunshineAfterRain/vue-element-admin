<template>
 <el-menu class="navbar" mode="horizontal">
   <div class="left-menu">
     <i class="iconfont icon-xinghuiyouxi logo"></i>
   </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <i class=" user-avatar iconfont icon-touxiang" ></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
                <span>首页</span>
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
  export default {
    name: 'NavBar',
    data () {
      return {
      }
    },
    methods: {
        logout () {
        }
    }
  }

</script>
<style lang='scss' scoped>
.left-menu {
  .logo {
    font-size: 160px;
    color: #fff;
  }
}
</style>
