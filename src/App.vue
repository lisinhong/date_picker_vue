<template>
  <div id="app">
    <div class="container">
      <DatePicker />
      <!-- <Calendar /> -->
    </div>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue';
import DatePicker from './components/DatePicker.vue';

export default {
  name: 'App',
  components: {
    Calendar,
    DatePicker,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
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
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  height: 100%;
}
</style>
