import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const calendar = {
  namespaced: true,
  state: {
    daysOfCalendar: 42,
    monthsOfCalendar: 12,
    yearsOfCalendar: 12,
    weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    visibleMonth: 0,
    visibleYear: 2009,
    today: new Date(),
    selectedDate: new Date(),
    mode: 'day',
    yearsRange: [],
  },
  getters: {
    currentYear(state) {
      return state.today.getFullYear();
    },
    currentMonth(state) {
      return state.today.getMonth();
    },
    currentDate(state) {
      return state.today.getDate();
    },
  },
  mutations: {
    setVisibleMonth(state, month) {
      state.visibleMonth = month;
    },
    setVisibleYear(state, year) {
      state.visibleYear = year;
    },
    setYearsRange(state, range) {
      state.yearsRange = range;
    },
    selectDate(state, date) {
      state.selectedDate = new Date(date);
    },
    selectMonth(state, month) {
      state.visibleMonth = month;
    },
    selectYear(state, year) {
      state.visibleYear = year;
    },
    switchMode(state, mode) {
      setTimeout(() => {
        state.mode = mode;
      }, 100);
    },
  },
};

const DatePicker = {
  namespaced: true,
  state: {

  },
  getters: {

  },
  mutations: {

  },
};

export default new Vuex.Store({
  modules: {
    calendar,
    DatePicker,
  },
});
