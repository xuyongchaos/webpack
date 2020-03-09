<template>
  <div class="container">
    b
  </div>
</template>

<script>
export default {
  created() {
    console.log('------ page a ------')
  }
}
</script>

<style lang="less" scoped>
@import url('./style.less');

.container {
  background: black;
  color: white;

  a {
    text-align: center;
    text-decoration: none;
  }

  b {
    font-weight: 500;
  }
}
</style>
