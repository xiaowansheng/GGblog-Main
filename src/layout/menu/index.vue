<template>
  <div class="top-nav">
    <TopNav></TopNav>
  </div>
  <div class="side-nav">
    <SideNav></SideNav>
  </div>
</template>

<script lang='ts' setup>
import TopNav from "./TopNav.vue";
import SideNav from "./SideNav.vue";
</script>

<style lang='scss' scoped>
//移动端
@media screen and (max-width: 1000px) {
  .top-nav {
    display: none;
  }
  .side-nav {
  }
}

//pc端
@media screen and (min-width: 1000px) {
  .side-nav {
    display: none;
  }
}
// TODO 菜单获得焦点后的背景色找不到设置
.el-menu {
  // li:focus{
  //   background-color: rgba(0, 0, 0, 0) !important;
  // }
}
</style>
<style lang="scss">
.nav {
  // .el-menu--horizontal>.el-menu-item.is-active{
  //   color: inherit !important;
  // }
  .white {
    .el-menu-item.is-active {
      color: white !important;
    }
  }
  .black {
    .el-menu-item.is-active {
      color: black !important;
    }
  }
  .side-nav {
    .el-menu-item.is-active {
      color: #303133 !important;
    }
  }
}
.dark {
  .nav {
    .side-nav {
      .el-menu-item.is-active {
        color: #E5EAF3 !important;
      }
    }
  }
}
</style>