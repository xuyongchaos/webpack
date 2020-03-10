<template>
  <div class="container">
    cccccccccc
    <p>{{ expression }}</p>
    <p>{{ mock }}</p>
  </div>
</template>

<script>
import mock from '../data/a.json'
export default {
  data() {
    return {
      mock,
      // eslint-disable-next-line no-undef
      expression: EXPRESSION
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
