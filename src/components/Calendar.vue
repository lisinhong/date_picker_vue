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
      <template v-else-if="mode === 'month'">
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
      <template v-else-if="mode === 'year'">
        <div class="calendar__header">
          <font-awesome-icon icon="angle-left" @click="goPreviousYearsRange" />
          <h3>{{ yearsRange[1] }} - {{ yearsRange[yearsRange.length - 2] }}</h3>
          <font-awesome-icon icon="angle-right" @click="goNextYearsRange" />
        </div>
        <div class="calendar__content">
          <YearSelector />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import DaySelector from './DaySelector.vue';
import MonthSelector from './MonthSelector.vue';
import YearSelector from './YearSelector.vue';

export default {
  name: 'Calendar',
  components: {
    DaySelector,
    MonthSelector,
    YearSelector,
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
      'yearsOfCalendar',
      'yearsRange',
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
    ...mapMutations([
      'setVisibleMonth',
      'setVisibleYear',
      'switchMode',
      'setYearsRange',
    ]),
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
    goPreviousYearsRange() {
      const firstYear = this.yearsRange[0] - 10;
      const yearsRange = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.yearsOfCalendar; i++) {
        const year = firstYear + i;
        yearsRange.push(year);
      }
      this.setYearsRange(yearsRange);
    },
    goNextYearsRange() {
      const firstYear = this.yearsRange[0] + 10;
      const yearsRange = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.yearsOfCalendar; i++) {
        const year = firstYear + i;
        yearsRange.push(year);
      }
      this.setYearsRange(yearsRange);
    },
  },
  created() {
    this.setVisibleMonth(this.currentMonth);
    this.setVisibleYear(this.currentYear);

    const yearsRange = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.yearsOfCalendar; i++) {
      const year = Math.floor(this.visibleYear / 10) * 10 - 1 + i;
      yearsRange.push(year);
    }
    this.setYearsRange(yearsRange);
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
