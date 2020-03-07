<template>
    <div class="container">a</div>
</template>

<script>
export default{
  created () {
    console.log('------ page a ------')
  }
}
</script>

<style lang="less" scoped>
@import url('./style.less');
.container{
  background-color: aqua;
  color: red;

}
</style>