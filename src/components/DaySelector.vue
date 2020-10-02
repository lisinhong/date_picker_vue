<template>
  <div class="day-selector">
    <div
      class="day-wrapper"
      v-for="day in remainingDaysOfPreviousMonth"
      :key="`prev-${daysOfPreviousMonth - remainingDaysOfPreviousMonth + day}`"
    >
      <Day
        :day="daysOfPreviousMonth - remainingDaysOfPreviousMonth + day"
        disabled
      />
    </div>
    <div
      class="day-wrapper"
      v-for="day in daysOfVisibleMonth"
      :key="`current-${day}`"
    >
      <Day :day="day" />
    </div>
    <div
      class="day-wrapper"
      v-for="day in remainingDaysOfNextMonth"
      :key="`next-${day}`"
    >
      <Day :day="day" disabled />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Day from './Day.vue';

const { mapState, mapMutations, mapGetters } = createNamespacedHelpers(
  'calendar',
);

export default {
  name: 'DaySelector',
  components: {
    Day,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      'today',
      'weekdays',
      'monthNames',
      'visibleMonth',
      'visibleYear',
      'daysOfCalendar',
    ]),
    ...mapGetters(['currentYear', 'currentMonth', 'currentDate']),
    daysOfVisibleMonth() {
      return new Date(this.visibleYear, this.visibleMonth + 1, 0).getDate();
    },
    daysOfPreviousMonth() {
      return new Date(this.visibleYear, this.visibleMonth, 0).getDate();
    },
    weekdayOfFirstDay() {
      return new Date(this.visibleYear, this.visibleMonth, 1).getDay();
    },
    weekdayOfLastDay() {
      return new Date(
        this.visibleYear,
        this.visibleMonth,
        this.daysOfVisibleMonth,
      ).getDay();
    },
    remainingDaysOfPreviousMonth() {
      return this.weekdayOfFirstDay;
    },
    remainingDaysOfNextMonth() {
      return (
        this.daysOfCalendar
        - this.remainingDaysOfPreviousMonth
        - this.daysOfVisibleMonth
      );
    },
  },
  methods: {
    ...mapMutations(['setVisibleMonth', 'setVisibleYear']),
  },
};
</script>

<style lang="scss" scoped>
.day-selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.day-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 calc(100% / 7);
}
</style>
