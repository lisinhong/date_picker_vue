<template>
  <div id="app">
    <div class="container">
      <div class="calendar">
        <div class="calendar__header">
          <font-awesome-icon icon="angle-left" />
          <h3>{{ monthNames[visibleMonth] }} {{ visibleYear }}</h3>
          <font-awesome-icon icon="angle-right" />
        </div>
        <div class="calendar__weekdays">
          <h4 v-for="weekday in weekdays" :key="weekday">{{ weekday }}</h4>
        </div>
        <div class="calendar__content">
          <div
            class="day-wrapper day-wrapper--previous"
            v-for="day in remainingDaysOfPreviousMonth"
            :key="`prev-${
              daysOfPreviousMonth - remainingDaysOfPreviousMonth + day
            }`"
          >
            <div class="day">
              {{ daysOfPreviousMonth - remainingDaysOfPreviousMonth + day }}
            </div>
          </div>
          <div
            class="day-wrapper"
            v-for="day in daysOfVisibleMonth"
            :key="`current-${day}`"
          >
            <div class="day">
              {{ day }}
            </div>
          </div>
          <div
            class="day-wrapper"
            v-for="day in remainingDaysOfNextMonth"
            :key="`next-${day}`"
          >
            <div class="day">
              {{ day }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'app',
  data() {
    return {};
  },
  computed: {
    ...mapState(['weekdays', 'monthNames', 'visibleMonth', 'visibleYear']),
    date() {
      return new Date();
    },
    currentYear() {
      return this.date.getFullYear();
    },
    currentMonth() {
      return this.date.getMonth();
    },
    currentDate() {
      return this.date.getDate();
    },
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
      return 42 - this.remainingDaysOfPreviousMonth - this.daysOfVisibleMonth;
    },
  },
  methods: {
    ...mapMutations(['setVisibleMonth', 'setVisibleYear']),
  },
  created() {
    this.setVisibleMonth(this.currentMonth);
    this.setVisibleYear(this.currentYear);
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
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

  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .day-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 calc(100% / 7);

      .day {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6vw;
        height: 6vw;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
}
</style>
