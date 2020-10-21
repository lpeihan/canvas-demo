<template>
  <div id="app">
    <transition :name="transitionName" :css="Boolean(transitionName)">
      <router-view class="app-view" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      const toPath = to.path.split("/").filter(item => item).length;
      const fromPath = from.path.split("/").filter(item => item).length;
      if (from.name === null) {
        this.transitionName = ""; // 第一次进入不需要过渡
      } else if (toPath === fromPath) {
        this.transitionName = "van-fade";
      } else if (toPath > fromPath) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style lang="less">
#app {
  padding-top: 44px;
  height: 100%;
}

.app-view {
  position: relative;
  min-height: 100%;
  z-index: 1;
  background: white;

  &.slide {
    &-left-enter,
    &-right-leave-to {
      transform: translate3d(100%, 0, 0);
    }

    &-left-leave-to,
    &-right-enter {
      transform: translate3d(-100%, 0, 0);
    }

    &-left-enter-active,
    &-left-leave-active,
    &-right-enter-active,
    &-right-enter-active {
      transition: transform 0.3s;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
