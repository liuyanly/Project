<template>
  <div>
    <grid-layout
      :layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="margin"
      :use-css-transforms="true"
    >

      <grid-item v-for="(item,index) in layout" class="item" :key="index"
       :x="item.x"
       :y="item.y"
       :w="item.w"
       :h="item.h"
       :i="item.i"
       @resize="resizeEvent"
       @move="moveEvent"
       @resized="resizedEvent"
       @moved="movedEvent"
       >
          {{item.i}}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
const GridLayout = VueGridLayout.GridLayout;
const GridItem   = VueGridLayout.GridItem;
export default {
  name: 'HelloWorld',
  components: {
      GridLayout,
      GridItem,
  },
  data () {
    return {
      draggable: true,  //是否可拖拽
      resizable: true,  //是否可缩放
      margin: [10, 10], //间隔
      layout: [
        {"x":0,"y":0,"w":2,"h":4,"i":"0"},
        {"x":2,"y":0,"w":2,"h":4,"i":"1"},
      ]
    }
  },
  methods: {
    resizeEvent(i, newH, newW) {
      // console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW);
    },
    moveEvent(i, newX, newY){
      // console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizedEvent(i, newH, newW, newHPx, newWPx){
      console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    },
    movedEvent(i, newX, newY){
      console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item {
    background-color: gray;
  }
</style>
