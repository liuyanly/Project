<template>
  <div id="app">
    <div class="header">
      <ul>
        <li
          v-for="(item, index) of tags"
          :class="{active: index === activeIndex}"
          @click="handleSelect(index)">
          {{item.text}}
        </li>
      </ul>
    </div>
    <router-view class="router"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      activeIndex: 0,
      tags: [
        { name: 'home', text: '首页' },
        { name: 'realTime', text: '实时' },
        { name: 'trace', text: '轨迹' },
      ]
    }
  },
  created() {
    // if(localStorage.currentPath) {
    //   const currentPath = localStorage.currentPath;
    //   if(currentPath === '/home') {
    //     this.activeIndex = 0;
    //   } else if(currentPath === '/realTime') {
    //     this.activeIndex = 1;
    //   } else if(currentPath === '/trace') {
    //     this.activeIndex = 2;
    //   }
    // }
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
      this.$router.push('/' + this.tags[index].name);
      localStorage.currentPath = '/' + this.tags[index].name;
    }
  }
}
</script>

<style scope>
  html,body,#app {
    height: 100%;
  }
  ul li{
    list-style-type:none;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
  }
  .header {
    height: 40px;
    width: 100%;
    position: fixed;
    padding-left: 50px;
    background-color: #195a91;
    z-index:10;
  }
  .header li {
    float: left;
    margin:0 1px;
    padding: 0 20px;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
  }
  .header li:hover, .header .active {
    background-color: #1e3d58;
  }
  .router {
    flex: 1;
    padding-top: 40px;
  }
</style>
