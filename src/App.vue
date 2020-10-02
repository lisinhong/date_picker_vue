<template>
  <div id="app">
    <div class="container">
      <DatePicker />
    </div>
  </div>
</template>

<script>
import DatePicker from './components/DatePicker.vue';

export default {
  name: 'App',
  components: {
    DatePicker,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1200px;
  width: 100%;
  height: 100%;
}
</style>
