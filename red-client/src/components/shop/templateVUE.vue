<template>
    <div class="templateVUE">
      <router-view ref="grandChild"></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    // 提供给父组件调用的搜索方法
    children_search_note (search_text) {
      // 继续深挖
      this.$refs.grandChild.children_search_note(this.search_text);
    },
  }
}
</script>

<style lang="less" scoped>
.templateVUE {
  width: 100%;
  height: 83%;
}
</style>