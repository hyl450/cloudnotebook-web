<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*modify by huangyl 左对齐*/
  text-align: left;
  color: #2c3e50;
  /*modify by huangyl 距顶部边距*/
  margin-top: 0px;
}
</style>
