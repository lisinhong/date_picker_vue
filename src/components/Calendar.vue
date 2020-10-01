<template>
  <div class="container">
    <div class="calendar">
      <div class="calendar__header">
        <font-awesome-icon icon="angle-left" @click="goPreviousMonth" />
        <h3>{{ monthNames[visibleMonth] }} {{ visibleYear }}</h3>
        <font-awesome-icon icon="angle-right" @click="goNextMonth" />
      </div>
      <template v-if="mode === 'day'">
        <div class="calendar__weekdays">
          <h4 v-for="weekday in weekdays" :key="weekday">{{ weekday }}</h4>
        </div>
        <div class="calendar__content">
          <DaySelector />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import DaySelector from './DaySelector.vue';

export default {
  name: 'Calendar',
  components: {
    DaySelector,
  },
  data() {
    return {
      mode: 'day',
    };
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
    goPreviousMonth() {
      const month = this.visibleMonth - 1;
      this.setVisibleMonth(month);
    },
    goNextMonth() {
      const month = this.visibleMonth + 1;
      this.setVisibleMonth(month);
    },
  },
  created() {
    this.setVisibleMonth(this.currentMonth);
    this.setVisibleYear(this.currentYear);
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  width: 80%;
  border: 1px solid #333;
  padding: 2em 1em;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      font-size: 1.5em;
      font-weight: 600;
    }

    svg {
      flex: 0 0 calc(100% / 7);
      font-size: 1.2em;
      cursor: pointer;
    }
  }

  &__weekdays {
    margin: 2em 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      margin: 0;
      font-size: 1.2em;
      font-weight: 600;
      flex: 1 1 calc(100% / 7);
      text-align: center;
    }
  }
}
</style>
