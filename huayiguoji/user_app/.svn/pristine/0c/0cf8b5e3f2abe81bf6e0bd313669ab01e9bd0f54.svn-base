<template>

  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <lg-preview></lg-preview>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
<style scoped>
.slide-fade,.slide-fade-leave{
  position: absolute;
  widows: 100vw;
}
.slide-fade-enter-active {
  transition: all 0.25s ease;
}

.slide-fade-leave-active {

  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(100vw);
  opacity: 0;
}
</style>