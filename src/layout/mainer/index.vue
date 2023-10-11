<template>
  <div id="content">
    <main>
      <!-- <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </router-view> -->
      <!-- <keep-alive>
        <router-view> </router-view>
      </keep-alive> -->
      <!-- <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"  v-if="$route.meta.keepAlive" />
        </keep-alive>
          <component :is="Component"  v-if="!$route.meta.keepAlive" />
      </router-view> -->
      <!-- <router-view></router-view> -->
      <!-- <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-show="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-show="!$route.meta.keepAlive" />
      </router-view> -->

      <router-view v-slot="{ Component, route }">
        <keep-alive v-if="route.meta.keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component v-else :is="Component" />
      </router-view>
      <!-- <router-view v-if="!$route.meta.keepAlive"> </router-view> -->
    </main>
  </div>
</template>

<style lang="scss" scoped>
// .temp {
//   background-color: red;
//   font-size: 2rem;
// }
#content {
  // background: linear-gradient(to right,#6de7cb,#e34ec5,#9ac440,#6fb5d3);

  main {
    padding-bottom: 2rem;
    background: linear-gradient(to right, #bbefd9, #ebb8e1, #d9c0ae, #a8cbdb);
  }
}
.dark {
  #content {
    main {
      background: linear-gradient(to right, #2a2d2c, #685063, #645850, #3e4b51);
    }
  }
}
</style>
