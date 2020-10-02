<template>
  <div class="month-selector">
    <div class="month-wrapper" v-for="n in monthsOfCalendar" :key="n">
      <Month :month="n - 1" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Month from './Month.vue';

export default {
  name: 'MonthSelector',
  components: {
    Month,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['monthNames', 'monthsOfCalendar']),
  },
};
</script>

<style lang="scss" scoped>
.month-selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.month-wrapper {
  margin: 2em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 calc(100% / 4);
}
</style>
