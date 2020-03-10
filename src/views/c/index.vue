<template>
  <div class="container">
    a
    <p>{{ mock }}</p>
  </div>
</template>

<script>
import mock from '../data/a.json'
export default {
  data() {
    return {
      mock
    }
  },
  created() {
    console.log('------ page a ------')
  }
}
</script>

<style lang="less" scoped>
@import url('./style.less');

.container {
  background-color: aqua;
  color: red;
}
</style>
