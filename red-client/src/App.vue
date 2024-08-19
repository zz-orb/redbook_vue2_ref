<template>
  <div id="app" style="overflow: hidden;">
    <router-view></router-view>
  </div>
</template>

<script>
// 导入组件

export default {
  name: 'App',
  data() { 
    return {
    }
  },
  methods: {},
}
</script>

<style lang="less">
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  position: relative;
  height: 100%;
  width: 100%;
  background-color: hsla(0,0%,100%,.98);
  overflow: hidden;
}
</style>