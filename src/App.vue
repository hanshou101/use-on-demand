<template>
  <div id="app">
    <img alt="Vue logo" src="">
    <h1>测试运行</h1>
  </div>
</template>

<script lang="ts">
import Vue              from 'vue';
import {SString_Helper} from '../symbol-string/SString_Helper';


export default Vue.extend({
  name      : 'App',
  components: {},
  mounted() {
    console.log(SString_Helper.formatFileSize(1234567890));
  }
});
</script>

<style>
#app {
  font-family             : Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing  : antialiased;
  -moz-osx-font-smoothing : grayscale;
  text-align              : center;
  color                   : #2c3e50;
  margin-top              : 60px;
}
</style>
