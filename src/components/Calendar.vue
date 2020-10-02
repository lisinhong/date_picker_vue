<template>
  <div class="container">
    <div class="calendar">
      <template v-if="mode === 'day'">
        <div class="calendar__header">
          <font-awesome-icon icon="angle-left" @click="goPreviousMonth" />
          <h3 @click="switchMode('month')">
            {{ monthNames[visibleMonth] }} {{ visibleYear }}
          </h3>
          <font-awesome-icon icon="angle-right" @click="goNextMonth" />
        </div>
        <div class="calendar__weekdays">
          <h4 v-for="weekday in weekdays" :key="weekday">{{ weekday }}</h4>
        </div>
        <div class="calendar__content">
          <DaySelector />
        </div>
      </template>
      <template v-else-if="'month'">
        <div class="calendar__header">
          <font-awesome-icon icon="angle-left" @click="goPreviousYear" />
          <h3 @click="switchMode('year')">
            {{ visibleYear }}
          </h3>
          <font-awesome-icon icon="angle-right" @click="goNextYear" />
        </div>
        <div class="calendar__content">
          <MonthSelector />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import DaySelector from './DaySelector.vue';
import MonthSelector from './MonthSelector.vue';

export default {
  name: 'Calendar',
  components: {
    DaySelector,
    MonthSelector,
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
      'mode',
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
    ...mapMutations(['setVisibleMonth', 'setVisibleYear', 'switchMode']),
    goPreviousMonth() {
      if (this.visibleMonth > 1 - 1) {
        const month = this.visibleMonth - 1;
        this.setVisibleMonth(month);
      } else {
        const month = 12 - 1;
        const year = this.visibleYear - 1;
        this.setVisibleMonth(month);
        this.setVisibleYear(year);
      }
    },
    goNextMonth() {
      if (this.visibleMonth < 12 - 1) {
        const month = this.visibleMonth + 1;
        this.setVisibleMonth(month);
      } else {
        const month = 1 - 1;
        const year = this.visibleYear + 1;
        this.setVisibleMonth(month);
        this.setVisibleYear(year);
      }
    },
    goPreviousYear() {},
    goNextYear() {},
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
      flex: 1;
      margin: 0;
      padding: 4px 0;
      font-size: 1.5em;
      font-weight: 600;
      text-align: center;
      cursor: pointer;
      transition: 0.2s;
      border-radius: 0.2em;

      &:hover {
        background: rgba(0, 0, 0, 0.2);
      }
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
